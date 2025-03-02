export enum QuestionType {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  RANGE = "range",
}

export interface Option {
  optionId: number;
  optionLabel: string;
  points: number;
}

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  options: Option[];
}

export type Responses = Record<number, number | number[]>;
