import styled, { keyframes } from "styled-components";
import { scrollbarStyle } from "../../../../styles/SharedStyles";

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

// Card container for the entire analytics view
export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  height: calc(100% - 1rem);
  margin: 10px 2rem 0;
  animation: ${fadeUp} 0.5s ease-out;
  width: calc(100% - 4rem);
  box-sizing: border-box;
  overflow-y: auto;
  ${scrollbarStyle}
  will-change: transform, opacity;
  transform-origin: top center;
  backface-visibility: hidden;

  @media (max-width: 768px) {
    margin: 10px 1rem 0;
    padding: 1.5rem;
    height: calc(100% - 1rem);
    width: calc(100% - 2rem);
  }

  @media (max-width: 480px) {
    margin: 10px 0.5rem 0;
    padding: 1rem;
    height: calc(100% - 1rem);
    width: calc(100% - 1rem);
  }
`;

// Shared containers
export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ${fadeUp} 0.5s ease-out;
  box-sizing: border-box;

  > * {
    margin-bottom: 15px;
  }

  .dropdown {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .dropdown-toggle {
    width: 215px;
  }

  @media (max-width: 600px) {
    .dropdown-toggle {
      width: 145px;
    }
  }
`;

export const AnalyticsContainer = styled.div`
  width: calc(100% - 190px);
  height: calc(100vh - 90px);
  overflow: hidden;
  position: absolute;
  top: 80px;
  left: 190px;
  animation: ${fadeUp} 1s ease-out;
  box-sizing: border-box;

  @media (max-width: 800px) {
    width: calc(100% - 70px);
    left: 70px;
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
