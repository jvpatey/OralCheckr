import styled, { keyframes } from "styled-components";

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

// Main container for the habit list
export const HabitListContainer = styled.div`
  width: calc(100% - 190px);
  height: calc(100vh - 56px);
  overflow-y: hidden;
  overflow-x: hidden;
  position: absolute;
  top: 56px;
  left: 190px;
  animation: ${fadeUp} 1s ease-out;

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
`;

// Wrapper for habit content
export const HabitWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 20px;

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
