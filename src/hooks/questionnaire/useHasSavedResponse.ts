import { useQuery } from "@tanstack/react-query";
import { hasSavedResponse } from "../../services/quesService";

export const useHasSavedResponse = () => {
  return useQuery({
    queryKey: ["hasSavedResponse"],
    queryFn: hasSavedResponse,
  });
};
