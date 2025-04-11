import { Question } from "./questionnaire.types";

/* -- Render questions types -- */

// Interface for the RenderQuestions component props, extending Question interface
export interface RenderQuestionsProps extends Question {
  onResponseChange: (questionId: number, response: number | number[]) => void;
  initialResponse?: number | number[];
}
