import styled, { css } from "styled-components";
import { HeroWaveSvg } from "../../../components/landing/HeroWaveSvg";

/* Bottom band: mask mirrored so fade matches scaleX-flipped waves */
const maskBottomBase = css`
  -webkit-mask-image: linear-gradient(
    90deg,
    black 0%,
    black 12%,
    rgba(0, 0, 0, 0.14) 38%,
    rgba(0, 0, 0, 0.14) 56%,
    rgba(0, 0, 0, 0.65) 100%
  );
  mask-image: linear-gradient(
    90deg,
    black 0%,
    black 12%,
    rgba(0, 0, 0, 0.14) 38%,
    rgba(0, 0, 0, 0.14) 56%,
    rgba(0, 0, 0, 0.65) 100%
  );
`;

const maskBottomDesktop = css`
  -webkit-mask-image: linear-gradient(
    90deg,
    black 0%,
    black 22%,
    rgba(0, 0, 0, 0.92) 34%,
    rgba(0, 0, 0, 0.55) 44%,
    rgba(0, 0, 0, 0.28) 58%,
    rgba(0, 0, 0, 0.12) 68%,
    rgba(0, 0, 0, 0.1) 100%
  );
  mask-image: linear-gradient(
    90deg,
    black 0%,
    black 22%,
    rgba(0, 0, 0, 0.92) 34%,
    rgba(0, 0, 0, 0.55) 44%,
    rgba(0, 0, 0, 0.28) 58%,
    rgba(0, 0, 0, 0.12) 68%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;

/* Same masks / opacity rhythm as DashboardHeroBackdrop; anchored to welcome hero */
const BandRoot = styled.div<{ $anchor: "top" | "bottom" }>`
  position: absolute;
  left: 50%;
  width: 100vw;
  height: clamp(150px, 32vh, 280px);
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  color: ${({ theme }) => theme.primary};
  opacity: 0.27;
  top: ${({ $anchor }) =>
    $anchor === "top" ? "clamp(-14px, -2.2vw, -28px)" : "auto"};
  bottom: ${({ $anchor }) =>
    $anchor === "bottom" ? "clamp(-14px, -2.2vw, -28px)" : "auto"};
  transform: translateX(-50%);

  -webkit-mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.14) 44%,
    rgba(0, 0, 0, 0.14) 62%,
    black 88%,
    black 100%
  );
  mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0.14) 44%,
    rgba(0, 0, 0, 0.14) 62%,
    black 88%,
    black 100%
  );
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  ${({ $anchor }) => $anchor === "bottom" && maskBottomBase}

  @media (min-width: 1024px) {
    opacity: 0.38;
    -webkit-mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.12) 32%,
      rgba(0, 0, 0, 0.28) 42%,
      rgba(0, 0, 0, 0.55) 56%,
      rgba(0, 0, 0, 0.92) 66%,
      black 78%,
      black 100%
    );
    mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.12) 32%,
      rgba(0, 0, 0, 0.28) 42%,
      rgba(0, 0, 0, 0.55) 56%,
      rgba(0, 0, 0, 0.92) 66%,
      black 78%,
      black 100%
    );

    ${({ $anchor }) => $anchor === "bottom" && maskBottomDesktop}

    /* Nudge top band only: small offset from original position so nav doesn’t visually slice the stroke */
    ${({ $anchor }) =>
      $anchor === "top" &&
      css`
        top: calc(
          clamp(-14px, -2.2vw, -28px) + clamp(10px, 1.8vw, 24px)
        );
      `}
  }

  @media (max-width: 768px) {
    height: clamp(130px, 30vh, 220px);
  }

  @media (max-width: 480px) {
    opacity: 0.19;
    height: clamp(112px, 28vh, 180px);
  }
`;

const FlipInner = styled.div<{ $flip: boolean }>`
  width: 100%;
  height: 100%;
  /* Horizontal + vertical flip so bottom waves curve and drift opposite the top */
  transform: ${({ $flip }) => ($flip ? "scaleX(-1) scaleY(-1)" : "none")};
`;

/** Full-bleed wave lines above and below the welcome hero (dashboard strokes). */
export function WelcomeHeroWaveBands() {
  return (
    <>
      <BandRoot $anchor="top" aria-hidden="true">
        <HeroWaveSvg hideLower tightCurves />
      </BandRoot>
      <BandRoot $anchor="bottom" aria-hidden="true">
        <FlipInner $flip>
          <HeroWaveSvg hideUpper tightCurves />
        </FlipInner>
      </BandRoot>
    </>
  );
}
