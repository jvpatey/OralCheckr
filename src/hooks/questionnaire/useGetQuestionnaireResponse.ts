import { useQuery } from "@tanstack/react-query";
import { getQuestionnaireResponse } from "../../services/quesService";

export const useGetQuestionnaireResponse = () => {
  return useQuery<Record<number, number | number[]> | null, Error>({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    refetchOnWindowFocus: false,
  });
};
