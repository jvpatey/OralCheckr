import { useQuery } from "@tanstack/react-query";
import { hasSavedResponse } from "../../services/quesService";

export const useHasSavedResponse = () => {
  return useQuery({
    queryKey: ["hasSavedResponse"],
    queryFn: hasSavedResponse,
    retry: false,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
