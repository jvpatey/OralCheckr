import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { weekToolbarControlHeight } from "../../../containers/habit-tracker/habits/weekToolbarTokens";

/** Heights come from weekToolbarControlHeight — must match WeekPickerIconButton exactly */
const TodayToolbarButton = styled.button`
  ${weekToolbarControlHeight}
  font-family: var(--font-sans), system-ui, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 9999px;
  flex-shrink: 0;
  margin: 0;
  width: auto;
  min-width: 0;
  padding-left: 12px !important;
  padding-right: 12px !important;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  box-shadow: none;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;

  @media (max-width: 768px) {
    padding-left: 11px !important;
    padding-right: 11px !important;
  }

  @media (max-width: 480px) {
    padding-left: 10px !important;
    padding-right: 10px !important;
    font-size: 0.75rem;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition:
      background 0.25s ease,
      color 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.99);
    }
  }

  svg {
    display: block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }
`;

interface TodayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function TodayButton({ onClick, disabled = false }: TodayButtonProps) {
  return (
    <TodayToolbarButton type="button" onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon icon={faCalendarDay} aria-hidden />
      Today
    </TodayToolbarButton>
  );
}
