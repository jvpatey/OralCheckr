import styled, { keyframes } from "styled-components";
import { scrollbarStyle } from "../../../../styles/SharedStyles";

// Animation for fading up elements
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

// Card container for the entire habit tracker
export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid ${({ theme }) => `${theme.textGrey}15`};
  padding: 2rem;
  height: calc(100% - 1rem);
  margin: 10px 2rem 0;
  animation: ${fadeUp} 0.5s ease-out;
  will-change: transform, opacity;
  transform-origin: top center;

  @media (max-width: 768px) {
    margin: 10px 1rem 0;
    padding: 1.5rem;
    height: calc(100% - 1rem);
  }

  @media (max-width: 480px) {
    margin: 10px 0.5rem 0;
    padding: 1rem;
    height: calc(100% - 1rem);
  }
`;

// Main container for the habit list
export const HabitListContainer = styled.div`
  width: calc(100% - 190px);
  height: calc(100vh - 90px);
  position: fixed;
  top: 80px;
  left: 190px;
  will-change: transform;
  backface-visibility: hidden;

  @media (max-width: 768px) {
    width: calc(100% - 70px);
    left: 70px;
  }
`;

// Scrollable container for habits
export const ScrollableHabitList = styled.div`
  height: calc(100vh - 300px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 0;
  ${scrollbarStyle}
  will-change: transform;
  backface-visibility: hidden;
`;

// Wrapper for habit content
export const HabitWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;
  will-change: transform;
  backface-visibility: hidden;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

// Header for the habits section
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.disabledText};
  width: 100%;
  white-space: nowrap;
`;

// Header text styling
export const HeaderText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.textGrey};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Container for header buttons
export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

// Styled container for the habit list
export const StyledHabitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

// Row for individual habits
export const HabitRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// Text for empty state
export const PlaceholderText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.textGrey};
  margin-top: 20px;
  text-align: center;
`;

// Wrapper for date picker
export const DatePickerWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;
