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
  background: ${({ theme }) => theme.primaryGradient};
  color: ${({ theme }) => theme.white};
  border: none;
  padding: 0 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  height: 48px;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-left: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadowMd},
    ${({ theme }) => theme.glowColor} 0 0 15px;

  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 12px;
  }

  @media (max-width: 600px) {
    min-width: 120px;
    padding: 0 15px;
    font-size: 12px;
    font-weight: bold;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) =>
      `${theme.shadowLg}, ${theme.glowColor} 0 0 25px`};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
    transition-duration: 0.1s;
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
  transition: all 0.4s ease-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 0 8px;
    height: 40px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.backgroundColor};
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
`;
