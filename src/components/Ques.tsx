import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

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

const DropdownSelect = styled.select`
  color: #222831;
  background-color: #e0e0e0;
  border-color: #f5f5f5;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
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

enum Type {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  RANGE = "range",
  DROPDOWN = "dropdown",
}

interface Option {
  optionId: number;
  optionLabel: string;
}

interface QuesProps {
  id: number;
  title: string;
  type: Type;
  options: Option[];
  onResponseChange: (questionId: number, response: number | number[]) => void;
}

export function Ques(props: QuesProps) {
  const { id, title, type, options, onResponseChange } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [rangeValue, setRangeValue] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [id]);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    onResponseChange(id, value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
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

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = Number(event.target.value);
    onResponseChange(id, value);
  };

  return (
    <FormContainer>
      <QuesTitle>{title}</QuesTitle>
      <form ref={formRef} style={{ width: "100%" }}>
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
                  />
                  <label htmlFor={`${id}-${option.optionId}`}>
                    {option.optionLabel}
                  </label>
                </FormGroup>
              ));
            case Type.DROPDOWN:
              return (
                <FormGroup isRange={false}>
                  <DropdownSelect
                    id={`question-${id}`}
                    name={`question-${id}`}
                    onChange={handleDropdownChange}
                  >
                    <option value="">Select an option</option>
                    {options.map((option) => (
                      <option key={option.optionId} value={option.optionId}>
                        {option.optionLabel}
                      </option>
                    ))}
                  </DropdownSelect>
                </FormGroup>
              );
            case Type.RANGE:
              return (
                <FormGroup isRange={true}>
                  <RangeInput
                    type="range"
                    id={`question-${id}`}
                    name={`question-${id}`}
                    min="0"
                    max={options.length - 1}
                    value={rangeValue}
                    onChange={handleRangeChange}
                  />
                  <RangeLabels>
                    {options.map((option) => (
                      <span key={option.optionId}>{option.optionLabel}</span>
                    ))}
                  </RangeLabels>
                </FormGroup>
              );
          }
        })()}
      </form>
    </FormContainer>
  );
}
