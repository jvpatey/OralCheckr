import styled from "styled-components";

export const QuesTitle = styled.h2`
  color: ${({ theme }) => theme.blue};
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;
`;

export const FormContainer = styled.div`
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

export const FormGroup = styled.div.withConfig({
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
  color: ${({ theme }) => theme.darkGrey};

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

export const RadioInput = styled.input`
  margin-right: 10px;
`;

export const CheckboxInput = styled.input`
  margin-right: 10px;
`;

export const RangeInput = styled.input`
  width: 100%;
  margin: 10px 0;
`;

export const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 0.4rem;
  }
`;
