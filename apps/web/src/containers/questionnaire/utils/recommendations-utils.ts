import questionData from "../../../common/questionnaire.json";
import type {
  Recommendation,
  SuggestedHabit,
} from "../../../common/types/questionnaire/recommendations.types";

type QuestionFromJson = (typeof questionData.questions)[0];
type OptionFromJson = QuestionFromJson["options"][number] & {
  suggestedHabit?: { name?: string; count?: number };
};

function parseSuggestedHabit(option: OptionFromJson): SuggestedHabit | undefined {
  const raw = option.suggestedHabit;
  if (!raw || typeof raw.name !== "string" || typeof raw.count !== "number") {
    return undefined;
  }
  const name = raw.name.trim();
  if (!name || raw.count < 1) {
    return undefined;
  }
  return { name, count: raw.count };
}

/** Very generic words — ignored when matching habit vs suggested names by token */
const GENERIC_HABIT_TOKENS = new Set([
  "about",
  "after",
  "and",
  "attend",
  "before",
  "book",
  "check",
  "checkups",
  "daily",
  "day",
  "days",
  "each",
  "every",
  "for",
  "from",
  "into",
  "less",
  "long",
  "meal",
  "meals",
  "more",
  "much",
  "only",
  "or",
  "per",
  "regular",
  "schedule",
  "than",
  "the",
  "time",
  "times",
  "twice",
  "once",
  "use",
  "using",
  "very",
  "week",
  "with",
  "without",
  "your",
  "my",
]);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function significantTokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 4 && !GENERIC_HABIT_TOKENS.has(t));
}

/** Same topic if a non-generic token from one string starts a word in the other (e.g. floss → flossing) */
function habitMatchesSuggestedByTokens(
  habitLower: string,
  suggestedLower: string
): boolean {
  for (const t of significantTokens(suggestedLower)) {
    if (new RegExp(`\\b${escapeRegex(t)}`, "i").test(habitLower)) {
      return true;
    }
  }
  for (const t of significantTokens(habitLower)) {
    if (new RegExp(`\\b${escapeRegex(t)}`, "i").test(suggestedLower)) {
      return true;
    }
  }
  return false;
}

/**
 * True if an existing habit is the same trackable idea as the suggestion.
 * - Bidirectional substring (e.g. habit "Mouthrinse" vs suggested "Use mouthrinse daily")
 * - Word-boundary token overlap (e.g. "Flossing" vs "Floss daily" via token "floss")
 */
export function userAlreadyTracksSuggestedHabit(
  habits: { name: string }[],
  suggestedName: string
): boolean {
  const needle = suggestedName.trim().toLowerCase();
  if (!needle) return false;
  return habits.some((h) => {
    const hay = h.name.trim().toLowerCase();
    if (!hay) return false;
    if (hay.includes(needle) || needle.includes(hay)) return true;
    return habitMatchesSuggestedByTokens(hay, needle);
  });
}

// Processes a single option and returns a recommendation if feedback exists

export const processOption = (
  optionId: number,
  question: QuestionFromJson
): Recommendation | null => {
  const option = question.options.find((opt) => opt.optionId === optionId);
  if (option && option.feedback) {
    const suggestedHabit = parseSuggestedHabit(option);
    const rec: Recommendation = {
      category: question.Category,
      feedback: option.feedback,
    };
    if (suggestedHabit) {
      rec.suggestedHabit = suggestedHabit;
    }
    return rec;
  }
  return null;
};

// Adds a recommendation to the recommendations array if it exists

export const addRecommendation = (
  recs: Recommendation[],
  recommendation: Recommendation | null
) => {
  if (recommendation) {
    recs.push(recommendation);
  }
};

// Generates recommendations based on questionnaire responses

export const generateRecommendations = (
  storedResponses: Record<number, number | number[]>
): Recommendation[] => {
  const recs: Recommendation[] = [];

  questionData.questions.forEach((question) => {
    const response = storedResponses[question.id];
    if (Array.isArray(response)) {
      response.forEach((res) => {
        const recommendation = processOption(res, question);
        addRecommendation(recs, recommendation);
      });
    } else if (response !== undefined) {
      const recommendation = processOption(response, question);
      addRecommendation(recs, recommendation);
    }
  });

  return recs;
};
