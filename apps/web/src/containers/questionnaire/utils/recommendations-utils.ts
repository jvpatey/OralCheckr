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

// True if any existing habit name contains the suggested template (case-insensitive).
export function userAlreadyTracksSuggestedHabit(
  habits: { name: string }[],
  suggestedName: string
): boolean {
  const needle = suggestedName.trim().toLowerCase();
  if (!needle) return false;
  return habits.some((h) => h.name.trim().toLowerCase().includes(needle));
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
