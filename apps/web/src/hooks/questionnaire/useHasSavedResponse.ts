import { useQuestionnaireResponseQuery } from "./useQuestionnaireResponseQuery";

/** True when GET /questionnaire/response returned a row (same cache as full response query). */
export const useHasSavedResponse = () => {
  const query = useQuestionnaireResponseQuery();
  const { data: raw, ...rest } = query;
  return {
    ...rest,
    data: raw != null,
  };
};
