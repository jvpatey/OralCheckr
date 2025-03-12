import styled from "styled-components";

// Week picker container
export const WeekPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

// Week picker header
export const WeekPickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

// Week picker title
export const WeekPickerTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.blue};
  margin: 0 15px;
  text-align: center;
  min-width: 200px;

  @media (max-width: 768px) {
    font-size: 16px;
    min-width: 150px;
  }
`;

// Day bubble container
export const DayBubbleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;
  margin-top: 10px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Day bubble
export const DayBubble = styled.div<{
  $isSelected: boolean;
  $isToday: boolean;
  $isDisabled: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  background-color: ${({ $isSelected, $isToday, theme }) =>
    $isSelected
      ? theme.blue
      : $isToday
      ? theme.lightBlue
      : theme.backgroundColor};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.backgroundColor : theme.blue};
  border: 2px solid
    ${({ $isSelected, $isToday, $isDisabled, theme }) =>
      $isDisabled
        ? theme.disabledText
        : $isSelected
        ? theme.blue
        : $isToday
        ? theme.lightBlue
        : theme.disabledText};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: ${({ $isDisabled }) => ($isDisabled ? "none" : "scale(1.1)")};
    box-shadow: ${({ $isDisabled }) =>
      $isDisabled ? "none" : "0 2px 5px rgba(0, 0, 0, 0.2)"};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
  }
`;

// Day name
export const DayName = styled.div`
  font-size: 12px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

// Day number
export const DayNumber = styled.div`
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
