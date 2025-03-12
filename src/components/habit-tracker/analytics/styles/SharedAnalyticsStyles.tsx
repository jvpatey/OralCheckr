import styled, { keyframes } from "styled-components";

// Shared animations
export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Shared containers
export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  animation: ${fadeUp} 0.5s ease-out;

  > * {
    margin-bottom: 15px;
  }
`;

export const AnalyticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 190px);
  height: calc(100vh - 56px);
  overflow-y: auto;
  position: absolute;
  top: 56px;
  left: 190px;
  padding: 20px;
  box-sizing: border-box;
  animation: ${fadeUp} 1s ease-out;

  @media (max-width: 800px) {
    width: calc(100% - 35px);
    left: 40px;
  }
`;

// Shared text styles
export const NoHabitMessage = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.textGrey};
  text-align: center;
`;

export const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  margin-bottom: 8px;
`;

// Shared layout components
export const TilesAndCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 90%;
  margin-top: 10px;
  gap: 20px;
  align-items: stretch;
  min-height: 350px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    min-height: auto;
  }
`;

export const TilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 400px;
  height: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 400px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

// Shared tile styles
export const TileContainer = styled.div`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 180px;
  height: 100%;
`;

export const TileHeading = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.blue};
  margin-top: 0;
  margin-bottom: 5px;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

export const TileMainContent = styled.div<{ $isMissedDays?: boolean }>`
  font-size: 40px;
  font-weight: bold;
  color: ${({ $isMissedDays, theme }) =>
    $isMissedDays ? theme.red : theme.green};
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 30px;
  }
`;

export const TileSubContent = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textGrey};
  margin-top: 5px;
`;
