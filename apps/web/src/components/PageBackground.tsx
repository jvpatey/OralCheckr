import styled from "styled-components";
import { scrollbarStyle } from "../styles/SharedStyles";

const noiseDataUri = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E`;

// Page background with soft mesh, light radial accents, and subtle grain
export const PageBackground = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  background: ${({ theme }) => theme.backgroundGradient};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  padding-right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 1;
  ${scrollbarStyle}
  scrollbar-gutter: stable;

  /* Room past the last content on phones (home indicator + last pixels of preview/footer) */
  @media (max-width: 1023px) {
    padding-bottom: max(28px, env(safe-area-inset-bottom, 0px));
  }

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(
        ellipse 100% 80% at 50% -30%,
        ${({ theme }) => theme.primary}0d 0%,
        transparent 55%
      ),
      radial-gradient(
        circle at 15% 85%,
        ${({ theme }) => theme.primary}06 0%,
        transparent 45%
      ),
      radial-gradient(
        circle at 88% 18%,
        ${({ theme }) => theme.secondary}05 0%,
        transparent 42%
      ),
      radial-gradient(
        circle at 42% 48%,
        ${({ theme }) => theme.accent}04 0%,
        transparent 40%
      );
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("${noiseDataUri}");
    background-repeat: repeat;
    background-size: 256px 256px;
    opacity: 0.035;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 0;
  }

  @media (prefers-color-scheme: dark) {
    &::after {
      opacity: 0.045;
      mix-blend-mode: soft-light;
    }
  }

  /* Fixed + viewport-sized box is clipped to one page in many print engines */
  @media print {
    position: static !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    width: 100% !important;
    min-height: 0 !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    display: block !important;
    background: #ffffff !important;

    &::before,
    &::after {
      display: none !important;
    }
  }
`;
