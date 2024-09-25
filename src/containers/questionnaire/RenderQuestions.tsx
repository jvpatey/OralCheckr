import { useEffect, useState } from "react";
import styled from "styled-components";
import { Question, Type } from "./Questionnaire";
import { colors } from "../../common/utilities/color-utils";

// Styled-components for the Questionnaire component

const QuesTitle = styled.h2`
  color: ${colors.blue};
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
  width: 100%;
`;

const FormGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isRange",
})<{ isRange: boolean }>`
  display: flex;
  flex-direction: ${({ isRange }) => (isRange ? "column" : "row")};
  align-items: center;
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 15px;
  width: 100%;
  color: ${colors.darkGrey};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  label {
    margin-left: 10px;
    font-size: 1rem;
    cursor: pointer;
    flex-grow: 1;
  }
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

const RangeInput = styled.input`
  width: 100%;
  margin: 10px 0;
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// Interface for the RenderQuestions component props, extending Question interface
interface RenderQuestionsProps extends Question {
  onResponseChange: (questionId: number, response: number | number[]) => void;
  initialResponse?: number | number[];
}

// RenderQuestions functional component for rendering the questions inside the Questionnaire
export function RenderQuestions(props: RenderQuestionsProps) {
  const { id, title, type, options, onResponseChange, initialResponse } = props;
  const [rangeValue, setRangeValue] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  // useEffect to set initial values for all question types
  useEffect(() => {
    if (initialResponse !== undefined) {
      switch (type) {
        case Type.RADIO:
          setRangeValue(initialResponse as number);
          break;
        case Type.CHECKBOX:
          setSelectedOptions(initialResponse as number[]);
          break;
        case Type.RANGE:
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
    if (type === Type.RANGE) {
      if (initialResponse === undefined) {
        const initialValue = 1;
        setRangeValue(initialValue);
        onResponseChange(id, initialValue);
      } else {
        setRangeValue(initialResponse as number);
      }
    }
  }, [id, type]);

  // Handler for range input changes
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) + 1;
    setRangeValue(value);
    onResponseChange(id, value);
  };

  // Handler for radio input changes
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    onResponseChange(id, value);
  };

  // Handler for checkbox input changes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const newSelectedOptions = event.target.checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);
    setSelectedOptions(newSelectedOptions);
    onResponseChange(id, newSelectedOptions);
  };

  return (
    <FormContainer>
      <QuesTitle>{title}</QuesTitle>
      <form style={{ width: "100%" }}>
        {(() => {
          // Render inputs based on question type
          switch (type) {
            case Type.RADIO:
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
            case Type.CHECKBOX:
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
            case Type.RANGE:
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
