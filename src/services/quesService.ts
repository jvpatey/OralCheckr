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
  id: number;
  userId: number;
  responses: Record<string, string>;
  totalScore: number;
  currentQuestion: number;
  createdAt: string;
  updatedAt: string;
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
  } catch (error) {
    console.error("Error saving questionnaire response:", error);
    throw error;
  }
};

/* -- Service to retrieve questionnaire data -- */
export const getQuestionnaireResponse =
  async (): Promise<QuestionnaireResponse | null> => {
    try {
      const data = await apiRequest<QuestionnaireResponse>(
        QUESTIONNAIRE_RESPONSE_ENDPOINT,
        "GET"
      );
      return data;
    } catch (error) {
      // For 404 errors, return null as it means no data exists yet
      if (error instanceof Error && error.message.includes("404")) {
        return null;
      }
      throw error;
    }
  };

/* -- Service to check if user has questionnaire data saved -- */
export const hasSavedResponse = async (): Promise<boolean> => {
  try {
    const data = await apiRequest<QuestionnaireResponse | null>(
      QUESTIONNAIRE_RESPONSE_ENDPOINT,
      "GET"
    );
    return data !== null;
  } catch (error) {
    return false;
  }
};

/* -- Service to get total score from questionnaire data -- */
export const getTotalScore = async (): Promise<number | null> => {
  try {
    const data = await apiRequest<QuestionnaireResponse | null>(
      QUESTIONNAIRE_RESPONSE_ENDPOINT,
      "GET"
    );
    return data?.totalScore ?? null;
  } catch (error) {
    return null;
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

/* -- Service to delete questionnaire data -- */
export const deleteQuestionnaireData = async (): Promise<void> => {
  try {
    await apiRequest<void>(QUESTIONNAIRE_RESPONSE_ENDPOINT, "DELETE");
  } catch (error) {
    console.error("Error deleting questionnaire data:", error);
    throw error;
  }
};

/* -- Error handler for questionnaire service errors -- */
export const handleQuesServiceError = (error: any): string => {
  return handleApiError(error, "Questionnaire");
};
