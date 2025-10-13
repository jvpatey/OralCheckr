import styled from "styled-components";

// Base button style
export const BaseButton = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

// Icon button container with modern gradient styling
export const IconButtonContainer = styled(BaseButton)<{
  $disabled?: boolean;
  $borderColor: string;
  $color: string;
  $hoverBackgroundColor: string;
}>`
  /* Glassmorphism background */
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.disabledBackground : `${theme.glassBg}`};
  backdrop-filter: ${({ $disabled }) => ($disabled ? "none" : "blur(8px)")};
  -webkit-backdrop-filter: ${({ $disabled }) =>
    $disabled ? "none" : "blur(8px)"};

  /* Modern border with gradient color */
  border: 2px solid
    ${({ $borderColor, $disabled, theme }) =>
      $disabled ? theme.disabledBackground : $borderColor};
  color: ${({ $color, $disabled, theme }) =>
    $disabled ? theme.disabledText : $color};

  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: ${({ theme, $disabled }) =>
    $disabled ? "none" : theme.shadowSm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  /* Gradient overlay for hover effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $hoverBackgroundColor, theme }) =>
      `linear-gradient(135deg, ${$hoverBackgroundColor} 0%, ${$hoverBackgroundColor}90 100%)`};
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 10px;
  }

  &:hover:not([aria-disabled="true"]) {
    background: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
    border: 2px solid ${({ $borderColor }) => $borderColor};
    color: white;
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);

    &::before {
      opacity: 0.2;
    }
  }

  &:active:not([aria-disabled="true"]) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

// Icon text button container
export const IconTextButtonContainer = styled(BaseButton)`
  background-color: ${({ theme }) => theme.blue};
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: 600;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.darkBlue};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

// Icon container
export const IconContainer = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
