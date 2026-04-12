import styled from "styled-components";
import { HeroWaveSvg } from "./HeroWaveSvg";

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

/**
 * Dashboard-only: three staggered full-bleed waves behind the hero title block.
 */
export function DashboardHeroBackdrop() {
  return (
    <Root aria-hidden="true">
      <HeroWaveSvg />
    </Root>
  );
}
