import { useReducedMotion } from "framer-motion";

/** Opacity-only crossfade — shared by month/year toggle and date-range changes. */
export const analyticsOpacityVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export function useAnalyticsOpacityTransition() {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion === true
    ? { duration: 0 }
    : { duration: 0.12, ease: [0.4, 0, 0.2, 1] as const };
}
