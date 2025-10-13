import React from "react";
import styled from "styled-components";

interface ToggleButtonProps {
  options: { label: React.ReactNode; value: string }[];
  activeValue: string;
  onChange: (value: string) => void;
}

const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;
`;

// Modern 2025 pill-shaped toggle with floating indicator
const ToggleWrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 6px;
  box-shadow: ${({ theme }) => theme.shadowLg};
  display: flex;
  align-items: center;
  overflow: hidden;

  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.05;
    border-radius: 50px;
    pointer-events: none;
  }
`;

const ToggleIndicator = styled.div<{ $activeIndex: number }>`
  position: absolute;
  top: 6px;
  left: 6px;
  width: calc(50% - 6px);
  height: calc(100% - 12px);
  background: ${({ theme }) => theme.primaryGradient};
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${({ $activeIndex }) => $activeIndex * 100}%);
  box-shadow: ${({ theme }) => theme.shadowMd},
    ${({ theme }) => theme.glowColor} 0 0 20px;
  z-index: 1;

  &::after {
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
    border-radius: 50px;
  }
`;

const Button = styled.button<{ $active: boolean }>`
  position: relative;
  background: transparent;
  color: ${({ $active, theme }) =>
    $active ? theme.white : theme.textSecondary};
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  width: 215px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  border-radius: 50px;

  /* Icon spacing */
  svg {
    margin-right: 8px;
    transition: all 0.3s ease;
  }

  &:hover {
    color: ${({ $active, theme }) => ($active ? theme.white : theme.primary)};
    transform: translateY(-1px);

    svg {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  @media (max-width: 600px) {
    width: 145px;
    padding: 10px 16px;
    font-size: 13px;

    svg {
      margin-right: 6px;
    }
  }
`;

export function ToggleButton({
  options,
  activeValue,
  onChange,
}: ToggleButtonProps) {
  const activeIndex = options.findIndex(
    (option) => option.value === activeValue
  );

  return (
    <ToggleButtonContainer>
      <ToggleWrapper>
        <ToggleIndicator $activeIndex={activeIndex} />
        {options.map((option) => (
          <Button
            key={option.value}
            $active={activeValue === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </ToggleWrapper>
    </ToggleButtonContainer>
  );
}
