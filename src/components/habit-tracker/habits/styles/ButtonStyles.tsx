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

// Icon button container
export const IconButtonContainer = styled(BaseButton)<{
  $disabled?: boolean;
  $borderColor: string;
  $color: string;
  $hoverBackgroundColor: string;
}>`
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.disabledBackground : theme.backgroundColor};
  border: 2px solid
    ${({ $borderColor, $disabled, theme }) =>
      $disabled ? theme.disabledBackground : $borderColor};
  color: ${({ $color, $disabled, theme }) =>
    $disabled ? theme.disabledText : $color};
  width: 50px;
  height: 45px;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;

  &:hover {
    background-color: ${({ $hoverBackgroundColor, $disabled, theme }) =>
      $disabled ? theme.disabledBackground : $hoverBackgroundColor};
    border: 2px solid
      ${({ $borderColor, $disabled, theme }) =>
        $disabled ? theme.disabledBackground : $borderColor};
    color: ${({ theme, $disabled }) =>
      $disabled ? theme.disabledText : theme.backgroundColor};
    box-shadow: ${({ $disabled }) =>
      $disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
  }

  @media (max-width: 768px) {
    width: 45px;
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
