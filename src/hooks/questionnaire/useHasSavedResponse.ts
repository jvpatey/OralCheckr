import { useQuery } from "@tanstack/react-query";
import { hasSavedResponse } from "../../services/quesService";

// Hook for checking if user has saved responses
export const useHasSavedResponse = () => {
  return useQuery({
    queryKey: ["hasSavedResponse"],
    queryFn: hasSavedResponse,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    initialData: false,
  });
};
