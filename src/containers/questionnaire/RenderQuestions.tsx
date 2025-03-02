import { useEffect, useState } from "react";
import { QuestionType } from "../../common/types/questionnaire/questionnaire.types";
import { RenderQuestionsProps } from "../../common/types/questionnaire/render-questions.types";
import {
  QuesTitle,
  FormContainer,
  FormGroup,
  RadioInput,
  CheckboxInput,
  RangeInput,
  RangeLabels,
} from "./styles/RenderQuestionsStyles";
import {
  createRangeChangeHandler,
  createRadioChangeHandler,
  createCheckboxChangeHandler,
} from "./utils/render-questions-utils";

// RenderQuestions functional component for rendering the questions inside the Questionnaire
export function RenderQuestions(props: RenderQuestionsProps) {
  const { id, title, type, options, onResponseChange, initialResponse } = props;
  const [rangeValue, setRangeValue] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  // useEffect to set initial values for all question types
  useEffect(() => {
    if (initialResponse !== undefined) {
      switch (type) {
        case QuestionType.RADIO:
          setRangeValue(initialResponse as number);
          break;
        case QuestionType.CHECKBOX:
          setSelectedOptions(initialResponse as number[]);
          break;
        case QuestionType.RANGE:
          setRangeValue(initialResponse as number);
          break;
        default:
          break;
      }
    } else {
      setRangeValue(null);
      setSelectedOptions([]);
    }
  }, [id, initialResponse, type]);

  // Initialize range value when the component mounts if it's a range question
  useEffect(() => {
    if (type === QuestionType.RANGE) {
      if (initialResponse === undefined) {
        const initialValue = 1;
        setRangeValue(initialValue);
        onResponseChange(id, initialValue);
      } else {
        setRangeValue(initialResponse as number);
      }
    }
  }, [id, type]);

  // Create handlers using the factory functions
  const handleRangeChange = createRangeChangeHandler(
    id,
    setRangeValue,
    onResponseChange
  );
  const handleRadioChange = createRadioChangeHandler(
    id,
    setRangeValue,
    onResponseChange
  );
  const handleCheckboxChange = createCheckboxChangeHandler(
    id,
    selectedOptions,
    setSelectedOptions,
    onResponseChange
  );

  return (
    <FormContainer>
      <QuesTitle>{title}</QuesTitle>
      <form style={{ width: "100%" }}>
        {(() => {
          // Render inputs based on question type
          switch (type) {
            case QuestionType.RADIO:
              return options.map((option) => (
                <FormGroup key={option.optionId} isRange={false}>
                  <RadioInput
                    type="radio"
                    id={`${id}-${option.optionId}`}
                    name={`question-${id}`}
                    value={option.optionId}
                    onChange={handleRadioChange}
                    checked={rangeValue === option.optionId}
                  />
                  <label htmlFor={`${id}-${option.optionId}`}>
                    {option.optionLabel}
                  </label>
                </FormGroup>
              ));
            case QuestionType.CHECKBOX:
              return options.map((option) => (
                <FormGroup key={option.optionId} isRange={false}>
                  <CheckboxInput
                    type="checkbox"
                    id={`${id}-${option.optionId}`}
                    name={`question-${id}`}
                    value={option.optionId}
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes(option.optionId)}
                  />
                  <label htmlFor={`${id}-${option.optionId}`}>
                    {option.optionLabel}
                  </label>
                </FormGroup>
              ));
            case QuestionType.RANGE:
              return (
                <FormGroup isRange={true}>
                  <RangeInput
                    type="range"
                    id={`question-${id}`}
                    name={`question-${id}`}
                    min="0"
                    max={options.length - 1}
                    value={rangeValue !== null ? rangeValue - 1 : 0}
                    onChange={handleRangeChange}
                  />
                  <RangeLabels>
                    {options.map((option) => (
                      <span key={option.optionId}>{option.optionLabel}</span>
                    ))}
                  </RangeLabels>
                </FormGroup>
              );
            default:
              return null;
          }
        })()}
      </form>
    </FormContainer>
  );
}
