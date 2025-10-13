import styled from "styled-components";
import { slideInFromRight } from "./SharedAnalyticsStyles";

// Modern glassmorphism calendar container styles - now with integrated month selector
export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  min-width: 600px;
  margin-top: 0;
  position: relative;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem 1rem 1rem 1rem;
  box-shadow: ${({ theme }) => theme.shadowLg};
  height: 400px;
  min-height: 400px;
  overflow: hidden;
  flex-shrink: 1;
  gap: 0.75rem;

  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.05;
    border-radius: 16px;
    pointer-events: none;
  }

  /* Slide in animation */
  animation: ${slideInFromRight} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;

  @media (max-width: 1200px) {
    max-width: 100%;
    min-width: 550px;
    height: 360px;
    min-height: 360px;
  }

  @media (max-width: 1024px) {
    margin-top: 0;
    padding: 2.25rem 1.25rem 1.25rem 1.25rem;
    height: auto;
    min-height: 320px;
    border-radius: 16px;
    max-width: 100%;
    min-width: 450px;
    gap: 1rem;

    &::before {
      border-radius: 16px;
    }
  }

  @media (max-width: 600px) {
    padding: 2rem 1rem 1rem 1rem;
    height: auto;
    min-height: 280px;
    border-radius: 12px;
    min-width: 300px;

    &::before {
      border-radius: 16px;
    }
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
