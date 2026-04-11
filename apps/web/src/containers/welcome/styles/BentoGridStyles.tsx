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

// Bento card container with dynamic sizing and scroll animations
export const BentoCardContainer = styled.div<{
  $size: "small" | "medium" | "large";
  $color: "primary" | "secondary" | "accent";
  $gradient: string;
  $index: number;
  $isVisible?: boolean;
}>`
  /* Dynamic grid sizing based on card size */
  grid-column: ${({ $size }) => {
    switch ($size) {
      case "large":
        return "span 8"; // Takes up 8/12 columns (2/3 width)
      case "medium":
        return "span 6"; // Takes up 6/12 columns (1/2 width)
      case "small":
        return "span 4"; // Takes up 4/12 columns (1/3 width)
      default:
        return "span 4";
    }
  }};
  grid-row: ${({ $size }) => {
    switch ($size) {
      case "large":
        return "span 2"; // Takes up 2 rows for height
      case "medium":
        return "span 1"; // Takes up 1 row
      case "small":
        return "span 1"; // Takes up 1 row
      default:
        return "span 1";
    }
  }};

  /* Apple-style scroll animation - smooth fade in and slide up */
  opacity: ${({ $isVisible = false }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible = false }) =>
    $isVisible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.95)"};
  filter: ${({ $isVisible = false }) => ($isVisible ? "blur(0px)" : "blur(8px)")};
  
  /* Smooth transitions with easing */
  transition: 
    opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Staggered delay for cascading effect */
  transition-delay: ${({ $index }) => $index * 0.12}s;

  /* Enhanced Glassmorphism Effect */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  /* Modern border styling */
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 24px;

  /* Enhanced shadow system */
  box-shadow: ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset,
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;

  padding: 32px 24px;
  cursor: pointer;
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

  /* Enhanced hover effects - only when visible */
  &:hover {
    transform: ${({ $isVisible = false }) => 
      $isVisible ? "translateY(-6px) scale(1.02)" : "translateY(60px) scale(0.95)"};
    filter: blur(0px);
    box-shadow: ${({ theme }) => theme.shadowXl},
      0 0 24px
        ${({ theme, $color }) =>
          $color === "primary"
            ? theme.primary + "25"
            : $color === "secondary"
            ? theme.secondary + "25"
            : theme.accent + "25"},
      0 0 0 1px
        ${({ theme, $color }) =>
          $color === "primary"
            ? theme.primary + "40"
            : $color === "secondary"
            ? theme.secondary + "40"
            : theme.accent + "40"}
        inset;
    border-color: ${({ theme, $color }) =>
      $color === "primary"
        ? theme.primary + "50"
        : $color === "secondary"
        ? theme.secondary + "50"
        : theme.accent + "50"};
  }

  &:active {
    transform: ${({ $isVisible = false }) => 
      $isVisible ? "translateY(-3px) scale(1.01)" : "translateY(60px) scale(0.95)"};
  }

  /* Dynamic gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme, $color }) =>
      $color === "primary"
        ? `linear-gradient(135deg, ${theme.primary}08 0%, transparent 50%)`
        : $color === "secondary"
        ? `linear-gradient(135deg, ${theme.secondary}08 0%, transparent 50%)`
        : `linear-gradient(135deg, ${theme.accent}08 0%, transparent 50%)`};
    opacity: 0;
    transition: all 0.4s ease;
    pointer-events: none;
    border-radius: 24px;
  }

  &:hover::before {
    opacity: 1;
  }

  /* Subtle shine effect on hover */
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 40%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 60%
    );
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    transition: transform 0.6s ease;
    pointer-events: none;
  }

  &:hover::after {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    grid-column: ${({ $size }) => {
      switch ($size) {
        case "large":
          return "span 8"; // Still takes up most of the width
        case "medium":
          return "span 6"; // Half width
        case "small":
          return "span 3"; // Quarter width
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
          return "span 6"; // Half width
        case "medium":
          return "span 6"; // Half width
        case "small":
          return "span 6"; // Half width
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
    grid-column: span 1; // Full width on mobile
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

// Bento icon styling
export const BentoIcon = styled.div<{
  $color: "primary" | "secondary" | "accent";
}>`
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $color }) =>
    $color === "primary"
      ? theme.primaryGradient
      : $color === "secondary"
      ? theme.secondaryGradient
      : theme.accentGradient};
  border-radius: 16px;
  color: white;
  font-size: 28px;
  box-shadow: ${({ theme }) => theme.shadowLg},
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  /* Subtle inner glow */
  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    );
    border-radius: 18px;
    pointer-events: none;
  }

  ${BentoCardContainer}:hover & {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowXl},
      0 0 15px
        ${({ theme, $color }) =>
          $color === "primary"
            ? theme.primary + "30"
            : $color === "secondary"
            ? theme.secondary + "30"
            : theme.accent + "30"},
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  }

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
    font-size: 24px;
    margin-bottom: 16px;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    font-size: 20px;
    margin-bottom: 14px;
    border-radius: 16px;
  }
`;

// Bento title styling
export const BentoTitle = styled.h3`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.25px;
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

// Bento description styling
export const BentoDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
  opacity: 0.9;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
