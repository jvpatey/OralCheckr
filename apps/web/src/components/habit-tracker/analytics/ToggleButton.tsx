import React from "react";
import styled from "styled-components";

interface ToggleButtonProps {
  options: { label: React.ReactNode; value: string }[];
  activeValue: string;
  onChange: (value: string) => void;
  /** When true, omits outer margin (e.g. inside analytics header). */
  embedded?: boolean;
  /** `end` fills parent width (pair with a sized column); `center` sizes to content. */
  align?: "center" | "end";
}

const ToggleButtonContainer = styled.div<{
  $embedded?: boolean;
  $align: "center" | "end";
}>`
  display: flex;
  justify-content: ${({ $align }) => ($align === "end" ? "stretch" : "center")};
  align-items: center;
  margin-bottom: ${({ $embedded }) => ($embedded ? "0" : "1.5rem")};
  width: ${({ $align }) => ($align === "end" ? "100%" : "fit-content")};
  max-width: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
`;

/** Outer shell matches HabitDropdown outline toggle (border, radius, height, no shadow). */
const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 3px;
  width: 100%;
  box-sizing: border-box;
  min-height: 40px;
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  border-radius: 9999px;
  box-shadow: none;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-1px);
    }
  }

  @media (max-width: 768px) {
    min-height: 38px;
  }
`;

const ToggleIndicator = styled.div<{
  $activeIndex: number;
  $segmentCount: number;
}>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(
    (100% - 6px - ${({ $segmentCount }) => ($segmentCount - 1) * 2}px) /
      ${({ $segmentCount }) => $segmentCount}
  );
  height: calc(100% - 6px);
  background: ${({ theme }) => `${theme.primary}0d`};
  border-radius: 9999px;
  box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(
    calc(${({ $activeIndex }) => $activeIndex} * (100% + 2px))
  );
  z-index: 1;
  pointer-events: none;
`;

const SegmentButton = styled.button<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 0;
  min-width: 0;
  background: transparent;
  color: ${({ $active, theme }) =>
    $active ? theme.primary : theme.textSecondary};
  border: none;
  padding: 0 12px;
  border-radius: 9999px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  z-index: 2;
  box-sizing: border-box;
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    padding: 0 10px;
  }
`;

export function ToggleButton({
  options,
  activeValue,
  onChange,
  embedded = false,
  align = "center",
}: ToggleButtonProps) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === activeValue),
  );
  const segmentCount = options.length;

  return (
    <ToggleButtonContainer $embedded={embedded} $align={align}>
      <ToggleWrapper>
        <ToggleIndicator
          $activeIndex={activeIndex}
          $segmentCount={segmentCount}
        />
        {options.map((option) => (
          <SegmentButton
            key={option.value}
            type="button"
            $active={activeValue === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </SegmentButton>
        ))}
      </ToggleWrapper>
    </ToggleButtonContainer>
  );
}
