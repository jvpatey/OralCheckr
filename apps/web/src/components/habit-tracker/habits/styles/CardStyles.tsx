import styled from "styled-components";

// Habit card container
export const HabitCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

// Habit card header
export const HabitCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

// Habit title
export const HabitTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Habit actions
export const HabitActions = styled.div`
  display: flex;
  gap: 10px;
`;

// Habit content
export const HabitContent = styled.div`
  display: flex;
  flex-direction: column;
`;

// Habit description
export const HabitDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

// Habit footer
export const HabitFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

// Habit stats
export const HabitStats = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

// Habit stat
export const HabitStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Stat label
export const StatLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

// Stat value
export const StatValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Progress container
export const ProgressContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

// Progress bar background
export const ProgressBarBackground = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.progressBackground};
  border-radius: 4px;
  overflow: hidden;
`;

// Progress bar fill
export const ProgressBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background-color: ${({ theme }) => theme.blue};
  border-radius: 4px;
  transition: width 0.3s ease;
`;
