import {
  QUESTIONNAIRE_RESPONSE_ENDPOINT,
  QUESTIONNAIRE_PROGRESS_ENDPOINT,
} from "../config/quesApiConfig";
import { apiRequest, handleApiError } from "./apiUtils";

export interface SaveResponseData {
  responses: Record<number, number | number[]>;
  totalScore: number;
  [key: string]: unknown;
}

export interface QuestionnaireResponse {
  responses: Record<number, number | number[]>;
  totalScore: number;
}

export interface QuestionnaireProgress {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
  [key: string]: unknown;
}

/* -- Service to save questionnaire responses -- */
export const saveQuestionnaireResponse = async (
  responseData: SaveResponseData
): Promise<void> => {
  try {
    await apiRequest<void>(
      QUESTIONNAIRE_RESPONSE_ENDPOINT,
      "POST",
      responseData
    );
    console.log("Questionnaire response saved successfully.");
  } catch (error) {
    console.error("Error saving questionnaire response:", error);
    throw error;
  }
};

/* -- Service to retrieve questionnaire data -- */
export const getQuestionnaireResponse = async (): Promise<Record<
  number,
  number | number[]
> | null> => {
  try {
    const data = await apiRequest<QuestionnaireResponse>(
      QUESTIONNAIRE_RESPONSE_ENDPOINT,
      "GET"
    );
    return data.responses;
  } catch (error) {
    console.error("Error fetching questionnaire response:", error);
    return null;
  }
};

/* -- Service to check if user has questionnaire data saved -- */
export const hasSavedResponse = async (): Promise<boolean> => {
  try {
    const data = await apiRequest<QuestionnaireResponse>(
      QUESTIONNAIRE_RESPONSE_ENDPOINT,
      "GET"
    );
    return !!data.responses;
  } catch (error) {
    console.error("Error checking for saved responses:", error);
    return false;
  }
};

/* -- Service to get total score from questionnaire data -- */
export const getTotalScore = async (): Promise<number> => {
  try {
    const data = await apiRequest<QuestionnaireResponse>(
      QUESTIONNAIRE_RESPONSE_ENDPOINT,
      "GET"
    );
    return data.totalScore ?? 0;
  } catch (error) {
    console.error("Error fetching total score:", error);
    return 0;
  }
};

/* -- Service to save questionnaire progress -- */
export const saveQuestionnaireProgress = async (
  progressData: QuestionnaireProgress
): Promise<void> => {
  try {
    await apiRequest<void>(
      QUESTIONNAIRE_PROGRESS_ENDPOINT,
      "PUT",
      progressData
    );
  } catch (error) {
    console.error("Error saving progress:", error);
    // Not rethrowing to prevent disrupting the user experience
  }
};

/* -- Service to get questionnaire progress -- */
export const getQuestionnaireProgress =
  async (): Promise<QuestionnaireProgress | null> => {
    try {
      return await apiRequest<QuestionnaireProgress>(
        QUESTIONNAIRE_PROGRESS_ENDPOINT,
        "GET"
      );
    } catch (error) {
      console.error("Error fetching progress:", error);
      return null;
    }
  };

/* -- Error handler for questionnaire service errors -- */
export const handleQuesServiceError = (error: any): string => {
  return handleApiError(error, "Questionnaire");
};
