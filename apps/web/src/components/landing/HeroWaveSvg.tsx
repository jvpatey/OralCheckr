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

const SvgLayer = styled.svg`
  width: 100%;
  height: 100%;
  display: block;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${gentleDrift} 24s ease-in-out infinite;
  }
`;

const PATH_UPPER =
  "M0 52 C 260 45, 520 52, 820 52 C 960 52, 1100 28, 1240 52 C 1380 76, 1480 24, 1600 52";
const PATH_UPPER_TIGHT =
  "M0 52 C 260 48, 520 52, 820 52 C 960 52, 1100 38, 1240 52 C 1380 66, 1480 36, 1600 52";

const PATH_MIDDLE =
  "M0 100 C 265 108, 535 100, 835 100 C 1000 100, 1160 174, 1300 100 C 1440 26, 1510 172, 1600 100";
const PATH_MIDDLE_TIGHT =
  "M0 100 C 265 105, 535 100, 835 100 C 1000 100, 1160 143, 1300 100 C 1440 57, 1510 142, 1600 100";

const PATH_LOWER =
  "M0 148 C 255 140, 505 148, 805 148 C 920 148, 1060 118, 1200 148 C 1340 178, 1475 125, 1600 148";
const PATH_LOWER_TIGHT =
  "M0 148 C 255 143, 505 148, 805 148 C 920 148, 1060 131, 1200 148 C 1340 165, 1475 135, 1600 148";

export interface HeroWaveSvgProps {
  /** Hide the upper stroke (welcome bottom band uses middle + lower only). */
  hideUpper?: boolean;
  /** Hide the lower stroke (welcome top band uses upper + middle only). */
  hideLower?: boolean;
  /** Smaller vertical excursions — welcome hero only; keeps strokes under nav / preview. */
  tightCurves?: boolean;
}

/** Shared horizontal wave strokes — used on dashboard and welcome hero. */
export function HeroWaveSvg({
  hideUpper,
  hideLower,
  tightCurves,
}: HeroWaveSvgProps) {
  const upper = tightCurves ? PATH_UPPER_TIGHT : PATH_UPPER;
  const middle = tightCurves ? PATH_MIDDLE_TIGHT : PATH_MIDDLE;
  const lower = tightCurves ? PATH_LOWER_TIGHT : PATH_LOWER;

  return (
    <SvgLayer
      viewBox="0 0 1600 200"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!hideUpper && (
        <path
          d={upper}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.98}
        />
      )}
      <path
        d={middle}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.38"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.78}
      />
      {!hideLower && (
        <path
          d={lower}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.22"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.62}
        />
      )}
    </SvgLayer>
  );
}
