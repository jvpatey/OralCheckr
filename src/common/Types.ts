export enum Type {
    RADIO = "radio",
    CHECKBOX = "checkbox",
    RANGE = "range",
    DROPDOWN = "dropdown"
  }
  
  export interface Option {
    optionId: number;
    optionLabel: string;
  }
  
  export interface QuesProps {
    id: number;
    title: string;
    type: Type;
    options: Option[];
  }