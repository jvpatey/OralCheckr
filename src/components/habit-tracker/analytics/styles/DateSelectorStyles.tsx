import styled from "styled-components";

// Date Picker styles
export const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 440px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    width: 300px;
    padding: 0 10px;
  }
`;

export const DatePickerButton = styled.button`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.blue};
  border: 2px solid ${({ theme }) => theme.blue};
  padding: 0 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  height: 45px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-left: 10px;

  @media (max-width: 600px) {
    min-width: 50px;
    padding: 0 10px;
    font-size: 10px;
    font-weight: bold;
  }

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    border: 2px solid ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.backgroundColor};
  }
`;

// Today button styles
export const TodayButtonContainer = styled.button`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.blue};
  border: 2px solid ${({ theme }) => theme.blue};
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  height: 45px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 0 8px;
    height: 40px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.backgroundColor};
  }
`;
