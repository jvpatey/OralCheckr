import styled, { keyframes } from "styled-components";
import { colors } from "../../common/color-utils";

// Styled components for the Habits component

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

export const ScrollableHabitList = styled.div`
  height: calc(100vh - 300px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 0;
`;

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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${colors.bgGrey};
  width: 100%;
  white-space: nowrap;
`;

export const HeaderText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${colors.textGrey};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const StyledHabitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

export const HabitRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PlaceholderText = styled.div`
  font-size: 18px;
  color: ${colors.textGrey};
  margin-top: 20px;
`;

export const DatePickerWrapper = styled.div`
  margin-top: 20px;
`;
