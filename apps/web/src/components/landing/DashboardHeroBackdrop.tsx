import styled, { keyframes } from "styled-components";

const gentleDrift = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(8px, 0, 0);
  }
`;

/* Tall band under the nav so waves sit behind eyebrow, title, and subtitle */
const Root = styled.div`
  position: fixed;
  top: clamp(86px, 11vh, 118px);
  left: 0;
  right: 0;
  width: 100%;
  height: clamp(150px, 32vh, 280px);
  pointer-events: none;
  z-index: 0;
  color: ${({ theme }) => theme.primary};
  /* Base opacity; horizontal mask dials down under headline, full strength on the right */
  opacity: 0.27;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.52) 0%,
    rgba(0, 0, 0, 0.14) 58%,
    rgba(0, 0, 0, 0.14) 78%,
    black 100%
  );
  mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.52) 0%,
    rgba(0, 0, 0, 0.14) 58%,
    rgba(0, 0, 0, 0.14) 78%,
    black 100%
  );
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  /* Match WelcomeStyles: left-aligned hero — soft band stays low longer, full mask + higher opacity on the right */
  @media (min-width: 1024px) {
    opacity: 0.38;
    -webkit-mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.08) 0%,
      rgba(0, 0, 0, 0.1) 44%,
      rgba(0, 0, 0, 0.26) 54%,
      rgba(0, 0, 0, 0.55) 68%,
      rgba(0, 0, 0, 0.92) 78%,
      black 100%
    );
    mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.08) 0%,
      rgba(0, 0, 0, 0.1) 44%,
      rgba(0, 0, 0, 0.26) 54%,
      rgba(0, 0, 0, 0.55) 68%,
      rgba(0, 0, 0, 0.92) 78%,
      black 100%
    );
  }

  @media (max-width: 768px) {
    height: clamp(130px, 30vh, 220px);
    top: clamp(82px, 12vh, 108px);
  }

  @media (max-width: 480px) {
    opacity: 0.19;
    height: clamp(112px, 28vh, 180px);
    top: clamp(76px, 14vw, 96px);
  }
`;

const SvgLayer = styled.svg`
  width: 100%;
  height: 100%;
  display: block;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${gentleDrift} 24s ease-in-out infinite;
  }
`;

/**
 * Dashboard-only: three staggered full-bleed waves behind the hero title block.
 */
export function DashboardHeroBackdrop() {
  return (
    <Root aria-hidden="true">
      <SvgLayer
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper — flat left (horizontal tangents), ease-in then smooth S on the right */}
        <path
          d="M0 52 C 260 45, 520 52, 820 52 C 960 52, 1100 28, 1240 52 C 1380 76, 1480 24, 1600 52"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.98}
        />
        {/* Middle — inverse phase; shifted peaks so lines aren’t perfectly parallel */}
        <path
          d="M0 100 C 265 108, 535 100, 835 100 C 1000 100, 1160 174, 1300 100 C 1440 26, 1510 172, 1600 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.38"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.78}
        />
        {/* Lower — softest; different phase again for a more organic stack */}
        <path
          d="M0 148 C 255 140, 505 148, 805 148 C 920 148, 1060 118, 1200 148 C 1340 178, 1475 125, 1600 148"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.22"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.62}
        />
      </SvgLayer>
    </Root>
  );
}
