import { useQuery } from "@tanstack/react-query";
import { getTotalScore } from "../../services/quesService";
import { useContext } from "react";
import { AuthContext } from "../../containers/authentication/AuthContext";

export const useGetTotalScore = (
  hasCompletedQuestionnaire: boolean = false
) => {
  const { user } = useContext(AuthContext);

  // Check if the user is a guest
  const isGuest =
    user?.role === "guest" ||
    (user?.firstName === "Guest" && user?.lastName === "User");

  return useQuery({
    queryKey: ["totalScore"],
    queryFn: async () => {
      const result = await getTotalScore();
      return result ?? null;
    },
    // Don't fetch for guest users or if questionnaire is not completed
    enabled: hasCompletedQuestionnaire && !isGuest,
    retry: false,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
