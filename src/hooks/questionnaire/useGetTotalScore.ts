import { useQuery } from "@tanstack/react-query";
import { getTotalScore } from "../../services/quesService";

export const useGetTotalScore = () => {
  return useQuery<number>({
    queryKey: ["totalScore"],
    queryFn: getTotalScore,
  });
};
