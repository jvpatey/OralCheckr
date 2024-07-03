import { useRef, useEffect } from "react";
import { Type, QuesProps } from "../common/Types";
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

const FormGroup = styled.div`
  display: flex;
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

export function Ques({ id, title, type, options }: QuesProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [id]);

  return (
    <FormContainer>
      <QuesTitle>{title}</QuesTitle>
      <form ref={formRef} style={{ width: "100%" }}>
        {type === Type.RADIO &&
          options.map((option) => (
            <FormGroup key={option.optionId}>
              <RadioInput
                type="radio"
                id={`${id}-${option.optionId}`}
                name={`question-${id}`}
                value={option.optionLabel}
              />
              <label htmlFor={`${id}-${option.optionId}`}>
                {option.optionLabel}
              </label>
            </FormGroup>
          ))}
        {type === Type.CHECKBOX &&
          options.map((option) => (
            <FormGroup key={option.optionId}>
              <CheckboxInput
                type="checkbox"
                id={`${id}-${option.optionId}`}
                name={`question-${id}`}
                value={option.optionLabel}
              />
              <label htmlFor={`${id}-${option.optionId}`}>
                {option.optionLabel}
              </label>
            </FormGroup>
          ))}
      </form>
    </FormContainer>
  );
}
