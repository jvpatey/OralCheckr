import { useEffect, useState } from "react";
import styled from "styled-components";
import { Question, Type } from "../pages/Questionnaire";

const QuesTitle = styled.h2`
  color: #07889b;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
  width: 100%;
`;

const FormGroup = styled.div<{ isRange: boolean }>`
  display: flex;
  flex-direction: ${({ isRange }) => (isRange ? "column" : "row")};
  align-items: center;
  background-color: #e0e0e0;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 15px;
  width: 100%;

  &:hover {
    background-color: #f0f0f0;
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

interface QuesProps extends Question {
  onResponseChange: (questionId: number, response: number | number[]) => void;
  initialResponse?: number | number[];
}

export function Ques(props: QuesProps) {
  const { id, title, type, options, onResponseChange, initialResponse } = props;
  const [rangeValue, setRangeValue] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  useEffect(() => {
    if (initialResponse) {
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

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    onResponseChange(id, value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    onResponseChange(id, value);
  };

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
                  <label htmlFor={`${id}-${option.optionId}`}>{option.optionLabel}</label>
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
                  <label htmlFor={`${id}-${option.optionId}`}>{option.optionLabel}</label>
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
                    value={rangeValue !== null ? rangeValue : 0}
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
