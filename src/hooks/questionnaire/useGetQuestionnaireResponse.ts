import { useQuery } from "@tanstack/react-query";
import {
  getQuestionnaireResponse,
  QuestionnaireResponse,
} from "../../services/quesService";
import { useContext } from "react";
import { AuthContext } from "../../containers/authentication/AuthContext";

export const useGetQuestionnaireResponse = (
  hasCompletedQuestionnaire: boolean = false
) => {
  const { user } = useContext(AuthContext);

  // Check if the user is a guest
  const isGuest =
    user?.role === "guest" ||
    (user?.firstName === "Guest" && user?.lastName === "User");

  return useQuery<QuestionnaireResponse | null, Error>({
    queryKey: ["questionnaireResponse"],
    queryFn: getQuestionnaireResponse,
    // Don't fetch for guest users or if questionnaire is not completed
    enabled: hasCompletedQuestionnaire && !isGuest,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
