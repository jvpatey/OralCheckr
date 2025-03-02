import styled from "styled-components";

// Styled component for the Navigation buttons inside the Questionnaire
export const NavigationButton = styled.button`
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.accentBackgroundColor};
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;
  width: 150px;

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.blue};
    border: solid 2px ${({ theme }) => theme.blue};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.disabledBackground};
    border: solid 2px ${({ theme }) => theme.disabledText};
    color: ${({ theme }) => theme.disabledText};
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 90px;
    font-size: 0.8rem;
  }
`;
