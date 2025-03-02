import {
  Question,
  Responses,
} from "../../types/questionnaire/questionnaire.types";
import { RoutePaths } from "../../constants/routes";
import { NavigateFunction } from "react-router-dom";
import { calculateTotalScore } from "./score-calculation-utils";

// Handles response changes in the questionnaire

export const createResponseChangeHandler = (
  responses: Responses,
  setResponses: React.Dispatch<React.SetStateAction<Responses>>,
  setHasInProgressQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>,
  saveProgressMutate: (data: {
    responses: Responses;
    currentQuestion: number;
  }) => Promise<any>,
  currentQuestion: number
) => {
  return async (qid: number, response: number | number[]) => {
    const updated = { ...responses, [qid]: response };
    setResponses(updated);
    setHasInProgressQuestionnaire(true);

    try {
      await saveProgressMutate({ responses: updated, currentQuestion });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };
};

// Handles navigation to the next question

export const createNextHandler = (
  currentQuestion: number,
  questions: Question[],
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>,
  setHasInProgressQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>,
  saveProgressMutate: (data: {
    responses: Responses;
    currentQuestion: number;
  }) => Promise<any>,
  responses: Responses,
  navigate: NavigateFunction
) => {
  return async () => {
    if (currentQuestion < questions.length) {
      const newQuestion = currentQuestion + 1;
      setCurrentQuestion(newQuestion);
      setHasInProgressQuestionnaire(true);

      try {
        await saveProgressMutate({ responses, currentQuestion: newQuestion });
      } catch (err) {
        console.error("Error saving progress:", err);
      }

      navigate(`${RoutePaths.QUESTIONNAIRE}/${newQuestion}`);
    }
  };
};

// Handles navigation to the previous question

export const createPreviousHandler = (
  currentQuestion: number,
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>,
  saveProgressMutate: (data: {
    responses: Responses;
    currentQuestion: number;
  }) => Promise<any>,
  responses: Responses,
  navigate: NavigateFunction
) => {
  return async () => {
    if (currentQuestion > 1) {
      const newQuestion = currentQuestion - 1;
      setCurrentQuestion(newQuestion);

      try {
        await saveProgressMutate({ responses, currentQuestion: newQuestion });
      } catch (err) {
        console.error("Error saving progress:", err);
      }

      navigate(`${RoutePaths.QUESTIONNAIRE}/${newQuestion}`);
    }
  };
};

// Handles quitting the questionnaire

export const createQuitHandler = (
  hasCompletedQuestionnaire: boolean,
  saveProgressMutate: (data: {
    responses: Responses;
    currentQuestion: number;
  }) => Promise<any>,
  responses: Responses,
  setIsRetaking: React.Dispatch<React.SetStateAction<boolean>>,
  setHasInProgressQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  return async () => {
    // If user has completed a questionnaire before
    if (hasCompletedQuestionnaire) {
      try {
        // Clear in-progress state but keep responses
        await saveProgressMutate({ responses, currentQuestion: 0 });

        // Update local state
        setIsRetaking(false);
        setHasInProgressQuestionnaire(false);

        // Navigate to results page
        navigate(RoutePaths.RESULTS);
      } catch (err) {
        console.error("Error clearing progress:", err);
        // Navigate anyway in case of error
        navigate(RoutePaths.RESULTS);
      }
    } else {
      // If no completed questionnaire, go to dashboard
      navigate(RoutePaths.LANDING);
    }
  };
};

// Handles submission of the questionnaire

export const createSubmitHandler = (
  questions: Question[],
  responses: Responses,
  saveResponseMutate: (data: {
    responses: Responses;
    totalScore: number;
  }) => Promise<any>,
  setHasCompletedQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>,
  setIsRetaking: React.Dispatch<React.SetStateAction<boolean>>,
  setHasInProgressQuestionnaire: React.Dispatch<React.SetStateAction<boolean>>,
  saveProgressMutate: (data: {
    responses: Responses;
    currentQuestion: number;
  }) => Promise<any>,
  navigate: NavigateFunction
) => {
  return async () => {
    const totalScore = calculateTotalScore(questions, responses);

    try {
      // Save to completed questionnaire table
      await saveResponseMutate({ responses, totalScore });
      console.log("Successfully saved questionnaire response.");

      // Update state
      setHasCompletedQuestionnaire(true);
      setIsRetaking(false);
      setHasInProgressQuestionnaire(false);

      // Keep responses but mark as completed (currentQuestion = 0)
      try {
        await saveProgressMutate({ responses, currentQuestion: 0 });
      } catch (err) {
        console.error("Error updating progress:", err);
      }

      // Navigate to results page
      navigate(RoutePaths.RESULTS);
    } catch (err) {
      console.error("Error submitting questionnaire:", err);
    }
  };
};
