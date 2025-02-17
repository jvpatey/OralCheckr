import { QUESTIONNAIRE_RESPONSE_ENDPOINT } from "../config/quesApiConfig";

interface SaveResponseData {
  responses: Record<number, number | number[]>;
  totalScore: number;
}

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
