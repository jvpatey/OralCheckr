import styled from "styled-components";

// Calendar container styles
export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-top: 0;
  position: relative;
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 400px;

  @media (max-width: 1024px) {
    margin-top: 10px;
    padding: 15px;
    height: 350px;
  }

  @media (max-width: 600px) {
    padding: 10px;
    height: 300px;
  }
`;

// Calendar and chart toggle container
export const ToggleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// Calendar styles
export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  width: 100%;
  max-width: 600px;
`;

export const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.blue};
  padding: 5px;
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const DayCell = styled.div<{
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $hasLogs: boolean;
}>`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isCurrentMonth, $isToday, theme }) =>
    $isToday
      ? theme.blue
      : $isCurrentMonth
      ? theme.accentBackgroundColor
      : theme.disabledBackground};
  color: ${({ $isToday, theme }) =>
    $isToday ? theme.backgroundColor : theme.textGrey};
  border-radius: 5px;
  cursor: ${({ $isCurrentMonth }) => ($isCurrentMonth ? "pointer" : "default")};
  opacity: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 1 : 0.5)};
  transition: all 0.2s ease;

  &:hover {
    transform: ${({ $isCurrentMonth }) =>
      $isCurrentMonth ? "scale(1.05)" : "none"};
    box-shadow: ${({ $isCurrentMonth }) =>
      $isCurrentMonth ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none"};
  }
`;

export const DayNumber = styled.div`
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const LogIndicator = styled.div<{ $count: number }>`
  font-size: 12px;
  margin-top: 2px;
  color: ${({ theme, $count }) => ($count > 0 ? theme.green : "transparent")};
  font-weight: ${({ $count }) => ($count > 0 ? "bold" : "normal")};

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

// Line chart styles
export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 10px;
  }
`;
