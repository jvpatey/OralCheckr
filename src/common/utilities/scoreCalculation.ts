import round from "lodash/round";
import { Question, Responses } from "../types/questionnaire.types";

/**
 * Calculates a score (0-100) based on questionnaire responses.
 * Scores each question as a percentage of its maximum points,
 * then averages these percentages.
 */

export const calculateTotalScore = (
  questions: Question[],
  responses: Responses
) => {
  let totalPercentage = 0;
  let answeredQuestions = 0;

  questions.forEach((question) => {
    const response = responses[question.id];

    // Process only answered questions
    if (response !== undefined) {
      // Find max possible points for this question
      const maxPointsForQuestion = Math.max(
        ...question.options.map((opt) => opt.points)
      );

      let questionPoints = 0;

      if (Array.isArray(response)) {
        // For checkboxes: sum selected option points
        response.forEach((optionId) => {
          const option = question.options.find(
            (opt) => opt.optionId === optionId
          );
          if (option) {
            questionPoints += option.points;
          }
        });
        // Cap at max points
        questionPoints = Math.min(questionPoints, maxPointsForQuestion);
      } else {
        // For radio/range: get selected option points
        const option = question.options.find(
          (opt) => opt.optionId === response
        );
        if (option) {
          questionPoints = option.points;
        }
      }

      // Convert to percentage
      const percentageScore =
        maxPointsForQuestion > 0
          ? (questionPoints / maxPointsForQuestion) * 100
          : 0;

      totalPercentage += percentageScore;
      answeredQuestions++;
    }
  });

  // Average the percentages
  const finalScore =
    answeredQuestions > 0 ? totalPercentage / answeredQuestions : 0;

  return round(finalScore, 0);
};
