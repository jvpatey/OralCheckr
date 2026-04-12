/* -- Questionnaire types -- */

// Question types
export enum QuestionType {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  RANGE = "range",
}

// Option type (questionnaire JSON may include feedback and suggestedHabit)
export interface Option {
  optionId: number;
  optionLabel: string;
  points: number;
  feedback?: string;
  suggestedHabit?: { name: string; count: number };
}

// Question interface
export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  options: Option[];
}

// Responses type
export type Responses = Record<number, number | number[]>;
