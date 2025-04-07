import { useQuery } from "@tanstack/react-query";
import { getQuestionnaireProgress } from "../../services/quesService";
import { useContext } from "react";
import { AuthContext } from "../../containers/authentication/AuthContext";

interface QuestionnaireProgress {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
}

export const useGetQuestionnaireProgress = (shouldFetch: boolean = false) => {
  const { user } = useContext(AuthContext);

  // Check if the user is a guest
  const isGuest =
    user?.role === "guest" ||
    (user?.firstName === "Guest" && user?.lastName === "User");

  return useQuery<QuestionnaireProgress | null>({
    queryKey: ["questionnaireProgress"],
    queryFn: getQuestionnaireProgress,
    // Skip API calls for guest users
    enabled: shouldFetch && !isGuest,
    retry: false, // Don't retry on failure
    staleTime: 30 * 60 * 1000, // Cache for 30 minutes
  });
};
