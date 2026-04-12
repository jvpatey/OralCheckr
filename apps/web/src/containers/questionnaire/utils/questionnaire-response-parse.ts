/** Normalize questionnaire `responses` from the API into the shape expected by scoring / recommendations. */
export function parseQuestionnaireResponsesFromApi(
  responses: Record<string, number | number[] | string> | null | undefined
): Record<number, number | number[]> {
  if (!responses) return {};

  const out: Record<number, number | number[]> = {};

  Object.entries(responses).forEach(([key, value]) => {
    const questionId = parseInt(key, 10);
    if (Number.isNaN(questionId)) return;
    if (typeof value === "number" || Array.isArray(value)) {
      out[questionId] = value;
      return;
    }
    if (typeof value === "string") {
      try {
        out[questionId] = JSON.parse(value);
      } catch {
        out[questionId] = parseInt(value, 10);
      }
    }
  });

  return out;
}
