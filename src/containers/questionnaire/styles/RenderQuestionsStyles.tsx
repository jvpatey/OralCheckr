import styled from "styled-components";

// Modern question container - no card, just clean layout
export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  /* No animation here - handled by parent wrapper */
`;

// Compact question title with minimal spacing
export const QuestionTitle = styled.h2`
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  line-height: 1.3;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }
`;

// Fluid options container - clean list styling
export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

// Compact option item - no cards, clean list styling with dark mode support
export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderLight};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  color: ${({ theme }) => theme.textPrimary};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.surfaceElevated};
    margin: 0 -20px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 12px;
    border-bottom-color: transparent;
    color: ${({ theme }) => theme.textPrimary};

    &:last-child {
      border-bottom: none;
    }
  }

  /* Selected state - subtle like navbar */
  &[data-selected="true"] {
    background: ${({ theme }) => theme.primary}12;
    color: ${({ theme }) => theme.primary};
    margin: 0 -20px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 12px;
    border-bottom-color: transparent;

    &:last-child {
      border-bottom: none;
    }
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    gap: 10px;

    &:hover,
    &[data-selected="true"] {
      margin: 0 -16px;
      padding-left: 16px;
      padding-right: 16px;
    }
  }
`;

// Compact option label with dark mode support
export const OptionLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: inherit;
  cursor: pointer;
  flex: 1;
  line-height: 1.3;
  transition: color 0.2s ease;

  ${OptionItem}:hover & {
    color: ${({ theme }) => theme.primary};
  }

  ${OptionItem}[data-selected="true"] & {
    color: inherit;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Subtle radio input styling like navbar
export const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.borderMedium};
  border-radius: 50%;
  background: ${({ theme }) => theme.surfaceColor};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  /* Remove default browser styling */
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
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${({ theme }) => theme.primaryLight};
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

// Subtle checkbox input styling like navbar
export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.borderMedium};
  border-radius: 4px;
  background: ${({ theme }) => theme.surfaceColor};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  /* Remove default browser styling */
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
      transform: translate(-50%, -50%);
      color: ${({ theme }) => theme.primaryLight};
      font-size: 11px;
      font-weight: bold;
    }
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

// Clean range container - no separator line
export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 16px 0;
`;

// Modern range input
export const RangeInput = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.surfaceElevated};
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryGradient};
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadowMd};
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: ${({ theme }) => theme.shadowLg};
    }
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryGradient};
    cursor: pointer;
    border: none;
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

// Range labels container
export const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 12px;
`;

// Individual range label
export const RangeLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
