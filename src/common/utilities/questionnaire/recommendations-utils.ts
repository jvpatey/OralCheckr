import questionData from "../../../common/questionnaire.json";
import { Recommendation } from "../../../common/types/questionnaire/recommendations.types";

// Processes a single option and returns a recommendation if feedback exists

export const processOption = (
  optionId: number,
  question: (typeof questionData.questions)[0]
): Recommendation | null => {
  const option = question.options.find((opt) => opt.optionId === optionId);
  if (option && option.feedback) {
    return {
      category: question.Category,
      feedback: option.feedback,
    };
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
