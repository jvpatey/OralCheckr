import styled, { keyframes } from "styled-components";

/** Subtle overshoot when a tile becomes selected (no theme inside keyframes) */
const optionTileSelect = keyframes`
  0% {
    transform: scale(0.985);
  }
  55% {
    transform: scale(1.012);
  }
  100% {
    transform: scale(1);
  }
`;

const radioDotIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const checkmarkIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.35) rotate(-12deg);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
    opacity: 1;
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

/** Matches BentoTitle — solid headline on questionnaire panel */
export const QuestionTitle = styled.h2`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 20px;
  letter-spacing: -0.03em;
  line-height: 1.25;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
    margin-bottom: 14px;
  }

  @media (max-height: 900px) and (min-width: 481px) {
    font-size: 1.3125rem;
    margin-bottom: 14px;
    line-height: 1.22;
  }

  @media (max-height: 750px) {
    font-size: 1.1875rem;
    margin-bottom: 12px;
    line-height: 1.2;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0;

  @media (max-height: 900px) and (min-width: 481px) {
    gap: 8px;
  }

  @media (max-height: 750px) {
    gap: 6px;
  }
`;

/** Full-width selectable tiles — native `<label>` so the whole row toggles the control */
export const OptionItem = styled.label`
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 48px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 14px;
  background: ${({ theme }) => theme.surfaceColor};
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
  transform-origin: center;
  transition:
    border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    background 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}40`};
    background: ${({ theme }) => theme.surfaceElevated};
  }

  &[data-selected="true"] {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => `${theme.primary}12`};
    color: ${({ theme }) => theme.textPrimary};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}25`};
  }

  @media (prefers-reduced-motion: no-preference) {
    &[data-selected="true"] {
      animation: ${optionTileSelect} 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    min-height: 44px;
    border-radius: 12px;
  }

  @media (max-height: 900px) and (min-width: 481px) {
    min-height: 44px;
    padding: 10px 14px;
  }

  @media (max-height: 750px) {
    min-height: 42px;
    padding: 8px 12px;
  }
`;

/** Text inside OptionItem — must be a span (label already wraps the row) */
export const OptionText = styled.span`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 1.0625rem;
  font-weight: 500;
  color: inherit;
  flex: 1;
  line-height: 1.35;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.borderMedium};
  border-radius: 50%;
  background: ${({ theme }) => theme.surfaceColor};
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s ease, background 0.2s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:checked {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary};

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${({ theme }) => theme.primaryLight};
      transform: translate(-50%, -50%);
      transform-origin: center;

      @media (prefers-reduced-motion: no-preference) {
        animation: ${radioDotIn} 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
      }
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.borderMedium};
  border-radius: 6px;
  background: ${({ theme }) => theme.surfaceColor};
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s ease, background 0.2s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:checked {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary};

    &::after {
      content: "✓";
      position: absolute;
      top: 50%;
      left: 50%;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      line-height: 1;
      transform: translate(-50%, -50%);
      transform-origin: center;

      @media (prefers-reduced-motion: no-preference) {
        animation: ${checkmarkIn} 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
      }
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  padding: 8px 0 4px;
`;

/** Inset matches half thumb width (22px) so track + labels share the same geometry */
export const RangeSliderShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  padding: 0 11px;
  box-sizing: border-box;
`;

export const RangeInput = styled.input`
  width: 100%;
  height: 28px;
  margin: 0;
  background: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::-webkit-slider-thumb {
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.surfaceColor},
      0 0 0 5px ${({ theme }) => theme.primary};
  }

  &:focus-visible::-moz-range-thumb {
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.surfaceColor},
      0 0 0 5px ${({ theme }) => theme.primary};
  }

  &::-webkit-slider-runnable-track {
    height: 8px;
    border-radius: 9999px;
    background: ${({ theme }) => theme.surfaceElevated};
    border: 1px solid ${({ theme }) => theme.borderLight};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) inset;
  }

  &::-moz-range-track {
    height: 8px;
    border-radius: 9999px;
    background: ${({ theme }) => theme.surfaceElevated};
    border: 1px solid ${({ theme }) => theme.borderLight};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) inset;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 22px;
    height: 22px;
    margin-top: -7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryGradient};
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.surfaceColor};
    box-shadow: ${({ theme }) => theme.shadowMd};
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.06);
      box-shadow: ${({ theme }) => theme.shadowLg};
    }
  }

  &::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryGradient};
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.surfaceColor};
    box-shadow: ${({ theme }) => theme.shadowMd};
  }

  @media (prefers-reduced-motion: reduce) {
    &::-webkit-slider-thumb,
    &::-moz-range-thumb {
      transition: none;
    }

    &::-webkit-slider-thumb:hover {
      transform: none;
    }
  }
`;

export const RangeLabels = styled.div`
  position: relative;
  width: 100%;
  min-height: 2.75rem;
`;

/**
 * Thumb centers span [11px, width - 11px] for a 22px thumb — match with calc, not space-between.
 */
export const RangeLabel = styled.span<{ $index: number; $total: number }>`
  position: absolute;
  top: 0;
  left: ${({ $index, $total }) =>
    $total <= 1
      ? "50%"
      : `calc(11px + (100% - 22px) * ${$index} / ${$total - 1})`};
  transform: translateX(-50%);
  transform-origin: center top;
  max-width: min(140px, 32vw);
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  line-height: 1.35;
  transition:
    color 0.38s cubic-bezier(0.22, 1, 0.36, 1),
    font-weight 0.22s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

  &[data-active="true"] {
    color: ${({ theme }) => theme.primary};
    font-weight: 700;
    transform: translateX(-50%) scale(1.07);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: color 0.2s ease, font-weight 0.15s ease;

    &[data-active="true"] {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    max-width: min(120px, 38vw);
  }
`;
