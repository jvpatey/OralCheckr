import { useCallback } from "react";
import confetti from "canvas-confetti";
import { useReducedMotion } from "framer-motion";

const DEFAULT_ORIGIN = { x: 0.5, y: 0.42 };

const getOriginFromElement = (
  tileElement?: HTMLElement | null,
): { x: number; y: number } => {
  if (!tileElement) {
    return DEFAULT_ORIGIN;
  }

  const { left, top, width, height } = tileElement.getBoundingClientRect();

  return {
    x: (left + width / 2) / window.innerWidth,
    y: (top + height / 2) / window.innerHeight,
  };
};

export const useHabitCompletionCelebration = () => {
  const prefersReducedMotion = useReducedMotion() === true;

  const celebrateHabitCompletion = useCallback(
    (tileElement?: HTMLElement | null) => {
      if (prefersReducedMotion) {
        return;
      }

      const origin = getOriginFromElement(tileElement);
      const commonOptions = {
        origin,
        ticks: 170,
        gravity: 1.05,
        disableForReducedMotion: true,
      };

      void confetti({
        ...commonOptions,
        particleCount: 40,
        spread: 62,
        startVelocity: 34,
        scalar: 0.95,
      });

      void confetti({
        ...commonOptions,
        particleCount: 22,
        spread: 84,
        startVelocity: 26,
        scalar: 0.8,
        decay: 0.93,
      });
    },
    [prefersReducedMotion],
  );

  return {
    celebrateHabitCompletion,
    prefersReducedMotion,
  };
};
