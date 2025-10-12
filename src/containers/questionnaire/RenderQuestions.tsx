import { useEffect, useState } from "react";
import { QuestionType } from "../../common/types/questionnaire/questionnaire.types";
import { RenderQuestionsProps } from "../../common/types/questionnaire/render-questions.types";
import {
  QuestionContainer,
  QuestionTitle,
  OptionsContainer,
  OptionItem,
  OptionLabel,
  RadioInput,
  CheckboxInput,
  RangeContainer,
  RangeInput,
  RangeLabels,
  RangeLabel,
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
    <QuestionContainer>
      <QuestionTitle>{title}</QuestionTitle>
      <OptionsContainer>
        {(() => {
          // Render inputs based on question type
          switch (type) {
            case QuestionType.RADIO:
              return options.map((option) => (
                <OptionItem
                  key={option.optionId}
                  data-selected={rangeValue === option.optionId}
                >
                  <RadioInput
                    type="radio"
                    id={`${id}-${option.optionId}`}
                    name={`question-${id}`}
                    value={option.optionId}
                    onChange={handleRadioChange}
                    checked={rangeValue === option.optionId}
                  />
                  <OptionLabel htmlFor={`${id}-${option.optionId}`}>
                    {option.optionLabel}
                  </OptionLabel>
                </OptionItem>
              ));
            case QuestionType.CHECKBOX:
              return options.map((option) => (
                <OptionItem
                  key={option.optionId}
                  data-selected={selectedOptions.includes(option.optionId)}
                >
                  <CheckboxInput
                    type="checkbox"
                    id={`${id}-${option.optionId}`}
                    name={`question-${id}`}
                    value={option.optionId}
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes(option.optionId)}
                  />
                  <OptionLabel htmlFor={`${id}-${option.optionId}`}>
                    {option.optionLabel}
                  </OptionLabel>
                </OptionItem>
              ));
            case QuestionType.RANGE:
              return (
                <RangeContainer>
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
                      <RangeLabel key={option.optionId}>
                        {option.optionLabel}
                      </RangeLabel>
                    ))}
                  </RangeLabels>
                </RangeContainer>
              );
            default:
              return null;
          }
        })()}
      </OptionsContainer>
    </QuestionContainer>
  );
}
