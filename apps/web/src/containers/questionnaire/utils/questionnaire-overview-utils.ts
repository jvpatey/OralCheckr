import questionData from "../../../common/questionnaire.json";
import {
  Question,
  QuestionType,
  Responses,
} from "../../../common/types/questionnaire/questionnaire.types";

type JsonQuestion = (typeof questionData.questions)[number];

export interface QuestionnaireOverviewRow {
  questionNumber: number;
  questionId: number;
  category: string | null;
  questionTitle: string;
  answerText: string;
}

function jsonQuestionsToTyped(): Question[] {
  return questionData.questions.map((q: JsonQuestion) => ({
    id: q.id,
    title: q.title,
    type: q.type as QuestionType,
    options: q.options,
  }));
}

function getCategory(q: JsonQuestion): string | null {
  const c = "Category" in q ? (q as { Category?: string }).Category : undefined;
  return c && String(c).trim() ? String(c).trim() : null;
}

/** Human-readable answers in questionnaire order (for visit summary / print). */
export function buildQuestionnaireOverview(
  responses: Responses | null | undefined
): QuestionnaireOverviewRow[] {
  const questions = jsonQuestionsToTyped();
  const res = responses ?? {};

  return questions.map((question, index) => {
    const jsonQ = questionData.questions.find(
      (jq) => jq.id === question.id
    ) as JsonQuestion;
    const raw = res[question.id];
    let answerText: string;

    if (raw === undefined || raw === null) {
      answerText = "—";
    } else if (Array.isArray(raw)) {
      if (raw.length === 0) {
        answerText = "None selected";
      } else {
        const labels = raw
          .map((optionId) =>
            question.options.find((o) => o.optionId === optionId)?.optionLabel
          )
          .filter((label): label is string => Boolean(label));
        answerText = labels.length > 0 ? labels.join("; ") : "—";
      }
    } else {
      const opt = question.options.find((o) => o.optionId === raw);
      answerText = opt?.optionLabel ?? String(raw);
    }

    return {
      questionNumber: index + 1,
      questionId: question.id,
      category: jsonQ ? getCategory(jsonQ) : null,
      questionTitle: question.title,
      answerText,
    };
  });
}
