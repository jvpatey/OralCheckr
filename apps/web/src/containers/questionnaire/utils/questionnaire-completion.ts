import type { QuestionnaireResponse } from "../../../services/quesService";

/** Row exists (204 → null from client). */
export function isQuestionnaireRecordPresent(
  record: QuestionnaireResponse | null | undefined
): boolean {
  return record != null;
}

/**
 * User finished and is idle on /questionnaire (show retake), not mid-flow.
 * Uses `completedAt` when present; legacy rows use full answers + currentQuestion 0.
 */
export function isFullyCompletedQuestionnaire(
  record: QuestionnaireResponse | null | undefined,
  questionCount: number
): boolean {
  if (!record) return false;
  if (record.completedAt != null && record.currentQuestion === 0) return true;
  const n = Object.keys(record.responses ?? {}).length;
  return (
    record.completedAt == null &&
    record.currentQuestion === 0 &&
    n >= questionCount
  );
}

/** Quit → results vs landing; true if they have (or had) a submitted questionnaire. */
export function hasEverSubmittedQuestionnaire(
  record: QuestionnaireResponse | null | undefined,
  questionCount: number
): boolean {
  if (!record) return false;
  if (record.completedAt != null) return true;
  return (
    record.currentQuestion === 0 &&
    Object.keys(record.responses ?? {}).length >= questionCount
  );
}
