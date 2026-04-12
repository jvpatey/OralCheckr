import styled from "styled-components";

// Bento grid container with modern CSS Grid layout
export const BentoGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(8, 1fr);
    gap: 22px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

// Bento cards — solid surfaces + cyan accents (aligned with hero / app preview)
export const BentoCardContainer = styled.div<{
  $size: "small" | "medium" | "large";
  $index: number;
  $isVisible?: boolean;
}>`
  grid-column: ${({ $size }) => {
    switch ($size) {
      case "large":
        return "span 8";
      case "medium":
        return "span 6";
      case "small":
        return "span 4";
      default:
        return "span 4";
    }
  }};
  grid-row: ${({ $size }) => {
    switch ($size) {
      case "large":
        return "span 2";
      case "medium":
      case "small":
        return "span 1";
      default:
        return "span 1";
    }
  }};

  opacity: ${({ $isVisible = false }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible = false }) =>
    $isVisible ? "translateY(0)" : "translateY(36px)"};
  filter: ${({ $isVisible = false }) =>
    $isVisible ? "blur(0px)" : "blur(6px)"};

  transition:
    opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.85s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;

  transition-delay: ${({ $index }) => $index * 0.1}s;

  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;

  padding: 32px 24px;
  cursor: default;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: ${({ $size }) => {
    switch ($size) {
      case "large":
        return "280px";
      case "medium":
        return "240px";
      case "small":
        return "200px";
      default:
        return "200px";
    }
  }};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}07 0%,
      transparent 52%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
    border-radius: 20px;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: ${({ $isVisible = false }) =>
        $isVisible ? "translateY(-3px)" : "translateY(36px)"};
      box-shadow:
        ${({ theme }) => theme.shadowXl},
        0 10px 36px rgba(0, 0, 0, 0.1),
        0 0 0 1px ${({ theme }) => theme.borderLight} inset;
      border-color: ${({ theme }) => `${theme.primary}30`};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    filter: none;
    &:hover {
      transform: none;
    }
  }

  &:active {
    transform: ${({ $isVisible = false }) =>
      $isVisible ? "translateY(-1px)" : "translateY(36px)"};
  }

  @media (max-width: 1024px) {
    grid-column: ${({ $size }) => {
      switch ($size) {
        case "large":
          return "span 8";
        case "medium":
          return "span 6";
        case "small":
          return "span 3";
        default:
          return "span 3";
      }
    }};
    padding: 20px 16px;
    min-height: ${({ $size }) => {
      switch ($size) {
        case "large":
          return "220px";
        case "medium":
          return "180px";
        case "small":
          return "140px";
        default:
          return "140px";
      }
    }};
  }

  @media (max-width: 768px) {
    grid-column: ${({ $size }) => {
      switch ($size) {
        case "large":
        case "medium":
        case "small":
          return "span 6";
        default:
          return "span 6";
      }
    }};
    padding: 18px 16px;
    min-height: ${({ $size }) => {
      switch ($size) {
        case "large":
          return "200px";
        case "medium":
          return "160px";
        case "small":
          return "140px";
        default:
          return "140px";
      }
    }};
  }

  @media (max-width: 480px) {
    grid-column: span 1;
    padding: 16px 14px;
    min-height: ${({ $size }) => {
      switch ($size) {
        case "large":
          return "180px";
        case "medium":
          return "160px";
        case "small":
          return "140px";
        default:
          return "140px";
      }
    }};
  }
`;

// Calm icon tile: light surface, cyan glyph (no multi-color gradients)
export const BentoIcon = styled.div`
  width: 52px;
  height: 52px;
  margin: 0 auto 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 14px;
  color: ${({ theme }) => theme.primary};
  font-size: 1.35rem;
  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    color 0.3s ease;

  svg {
    opacity: 0.92;
  }

  ${BentoCardContainer}:hover & {
    border-color: ${({ theme }) => `${theme.primary}35`};
    background: ${({ theme }) => theme.surfaceColor};
    color: ${({ theme }) => theme.primaryDark};
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
    margin-bottom: 10px;
    border-radius: 12px;
  }
`;

export const BentoTitle = styled.h3`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.03em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 6px;
  }
`;

export const BentoDescription = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.45;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
  }
`;
