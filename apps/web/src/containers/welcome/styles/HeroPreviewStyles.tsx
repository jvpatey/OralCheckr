import styled from "styled-components";

export const HeroPreviewRoot = styled.div<{ $visible: boolean }>`
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  position: relative;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.98)"};
  filter: ${({ $visible }) => ($visible ? "blur(0)" : "blur(6px)")};
  transition:
    opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 1024px) {
    max-width: none;
    margin: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
`;

export const HeroPreviewFrame = styled.div`
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.borderLight};
  background: ${({ theme }) => theme.surfaceColor};
  box-shadow:
    ${({ theme }) => theme.shadowXl},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      ${({ theme }) => theme.shadowXl},
      0 12px 40px rgba(0, 0, 0, 0.12),
      0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 480px) {
    border-radius: 16px;
  }
`;

export const HeroPreviewChrome = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.surfaceElevated};
  border-bottom: 1px solid ${({ theme }) => theme.borderLight};
`;

export const HeroPreviewDots = styled.div`
  display: flex;
  gap: 6px;
  flex-shrink: 0;
`;

export const HeroPreviewDot = styled.span<{ $tone: "close" | "min" | "max" }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $tone }) => {
    switch ($tone) {
      case "close":
        return "#ef4444";
      case "min":
        return "#f59e0b";
      case "max":
        return "#22c55e";
      default:
        return "#94a3b8";
    }
  }};
  opacity: 0.85;
`;

export const HeroPreviewUrlBar = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textTertiary};
  padding: 6px 12px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.glassBg};
  border: 1px solid ${({ theme }) => theme.borderLight};
  text-align: center;
  letter-spacing: 0.02em;
  font-family: var(--font-sans), system-ui, sans-serif;
`;

export const HeroPreviewBody = styled.div`
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.accentBackgroundColor};
  position: relative;
  overflow: hidden;
`;

export const HeroPreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
`;

export const HeroPreviewPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.primary}12 0%,
    ${({ theme }) => theme.surfaceElevated} 45%,
    ${({ theme }) => theme.secondary}10 100%
  );
`;

export const HeroPreviewPlaceholderInner = styled.div`
  text-align: center;
  max-width: 240px;
  font-family: var(--font-sans), system-ui, sans-serif;

  span {
    display: block;
    font-size: 1.05rem;
    font-weight: 600;
    color: ${({ theme }) => theme.textPrimary};
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }

  small {
    font-size: 0.8rem;
    line-height: 1.4;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const HeroPreviewBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

export const HeroPreviewBadge = styled.span`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 8px 14px;
  border-radius: 9999px;
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => theme.glassBg};
  border: 1px solid ${({ theme }) => theme.borderLight};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;
