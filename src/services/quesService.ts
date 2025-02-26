import {
  QUESTIONNAIRE_RESPONSE_ENDPOINT,
  QUESTIONNAIRE_PROGRESS_ENDPOINT,
} from "../config/quesApiConfig";

export interface SaveResponseData {
  responses: Record<number, number | number[]>;
  totalScore: number;
}

// API call save questionnaire responses
export const saveQuestionnaireResponse = async (
  responseData: SaveResponseData
): Promise<void> => {
  try {
    const response = await fetch(QUESTIONNAIRE_RESPONSE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(responseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Failed to save questionnaire response"
      );
    }

    console.log("Questionnaire response saved successfully.");
  } catch (error: any) {
    console.error("Error saving questionnaire response:", error.message);
    throw new Error("Error saving response. Please try again.");
  }
};

// API call to retrieve questionnaire data
export const getQuestionnaireResponse = async (): Promise<Record<
  number,
  number | number[]
> | null> => {
  try {
    const response = await fetch(QUESTIONNAIRE_RESPONSE_ENDPOINT, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch questionnaire response.");
      return null;
    }

    const data = await response.json();
    return data.responses;
  } catch (error) {
    console.error("Error fetching questionnaire response:", error);
    return null;
  }
};

// API call to check if user has questionnaire data saved
export const hasSavedResponse = async (): Promise<boolean> => {
  try {
    const response = await fetch(QUESTIONNAIRE_RESPONSE_ENDPOINT, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !!data.responses;
  } catch (error) {
    console.error("Error checking for saved responses:", error);
    return false;
  }
};

// API call to get total score from questionnaire data
export const getTotalScore = async (): Promise<number | null> => {
  try {
    const response = await fetch(QUESTIONNAIRE_RESPONSE_ENDPOINT, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch total score.");
      return null;
    }

    const data = await response.json();
    return data.totalScore || 0;
  } catch (error) {
    console.error("Error fetching total score:", error);
    return null;
  }
};

// API call to save questionnaire progress
export const saveQuestionnaireProgress = async (progressData: {
  responses: Record<number, number | number[]>;
  currentQuestion: number;
}): Promise<void> => {
  try {
    const response = await fetch(QUESTIONNAIRE_PROGRESS_ENDPOINT, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progressData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save progress");
    }
  } catch (err) {
    console.error("Error saving progress:", err);
  }
};

// API call to get questionnaire progress
export const getQuestionnaireProgress = async (): Promise<{
  responses: Record<number, number | number[]>;
  currentQuestion: number;
} | null> => {
  try {
    const response = await fetch(QUESTIONNAIRE_PROGRESS_ENDPOINT, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch progress.");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching progress:", err);
    return null;
  }
};
