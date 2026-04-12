import styled from "styled-components";

/** Month/year control row — flanking chevrons + center trigger */
export const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: min(420px, 100%);
  flex-wrap: nowrap;
  box-sizing: border-box;

  @media (max-width: 600px) {
    gap: 8px;
    max-width: 100%;
  }
`;

/** Matches habit outline dropdown trigger (border, height, typography). */
export const AnalyticsDateTriggerButton = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  border-radius: 9999px;
  min-height: 48px;
  padding: 0 22px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 0;
  column-gap: 0.25rem;
  box-shadow: none;
  box-sizing: border-box;
  min-width: 0;
  flex: 1 1 auto;
  max-width: 260px;
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-1px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    min-height: 44px;
    padding: 0 16px;
    font-size: 0.9375rem;
    max-width: 220px;
  }
`;

/** Outline chevron — aligned with enlarged month trigger */
export const AnalyticsChevronButton = styled.button<{ $disabled?: boolean }>`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  border: 1px solid
    ${({ theme, $disabled }) =>
      $disabled ? `${theme.borderLight}` : `${theme.primary}45`};
  background: transparent;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.disabledText : theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
  padding: 0;
  box-sizing: border-box;
  transition:
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${theme.primary}65`};
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }

  svg {
    font-size: 0.9375rem;
    color: currentColor;
  }
`;

/** @deprecated Legacy gradient month button — prefer AnalyticsDateTriggerButton */
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
  box-shadow:
    ${({ theme }) => theme.shadowMd},
    ${({ theme }) => theme.glowColor} 0 0 15px;

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

export const TodayButtonContainer = styled.button`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.blue};
  border: 2px solid ${({ theme }) => theme.blue};
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  min-height: 40px;
  height: 40px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0;
  white-space: nowrap;
  transition: all 0.4s ease-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  box-sizing: border-box;

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 0 12px;
    min-height: 40px;
    height: 40px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.backgroundColor};
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }
`;
