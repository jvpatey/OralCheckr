import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import round from "lodash/round";
import questionData from "../../common/questionnaire.json";
import styled from "styled-components";
import { PageBackground } from "../../components/PageBackground";
import { LandingContainer } from "../../components/landing/LandingContainer";
import { QuestionnaireCardContainer } from "../../components/questionnaire/QuestionnaireCardContainer";
import { QuestionnaireCard } from "../../components/questionnaire/QuestionnaireCard";
import { RenderQuestions } from "./RenderQuestions";
import { RoutePaths } from "../../common/constants/routes";
import { StartQuestionnaire } from "../../components/questionnaire/StartQuestionnaire";
import { RetakeQuestionnaire } from "./RetakeQuestionnaire";
import { NavigationButton } from "../../components/questionnaire/NavigationButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { saveQuestionnaireResponse } from "../../services/quesService";
import { hasSavedResponse } from "../../services/quesService";
import {
  getQuestionnaireProgress,
  saveQuestionnaireProgress,
} from "../../services/quesService";
import { AuthContext } from "../authentication/AuthContext";

// styled-component styles for Questionnaire Page

const QuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 375px) {
    padding: 10px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .progress-segment {
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.textGrey};
    border-radius: 4px;
    margin-right: 4px;

    &.filled {
      background-color: ${({ theme }) => theme.green};
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const ProgressIndicator = styled.div`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.blue};
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }

  @media (max-width: 375px) {
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled(NavigationButton).attrs({ as: "a" })`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-size: 1rem;
  padding: 10px 20px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 80px;
    font-size: 0.7rem;
  }
`;

const QuitButton = styled(NavigationButton)`
  background-color: ${({ theme }) => theme.red};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.red};
    border: solid 2px ${({ theme }) => theme.red};
  }
  }
`;

// types

export enum Type {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  RANGE = "range",
}

interface Option {
  optionId: number;
  optionLabel: string;
  points: number;
}

export interface Question {
  id: number;
  title: string;
  type: Type;
  options: Option[];
}

type Responses = Record<number, number | number[]>;

// Helper function to calculate the score for each option
const calculateOptionScore = (
  points: number,
  numberOfOptions: number,
  maxPointsPerQuestion: number
) => {
  return (points / numberOfOptions) * maxPointsPerQuestion;
};

// Helper function to find the option and calculate its score
const findOptionScore = (
  optionId: number,
  question: Question,
  maxPointsPerQuestion: number
) => {
  const option = question.options.find((opt) => opt.optionId === optionId);
  if (option) {
    return calculateOptionScore(
      option.points,
      question.options.length,
      maxPointsPerQuestion
    );
  }
  return 0;
};

// Function to calculate the total score when the user submits the questionnaire
const calculateTotalScore = (questions: Question[], responses: Responses) => {
  const numberOfQuestions = questions.length;
  const maxPointsPerQuestion = 100 / numberOfQuestions;
  let totalScore = 0;

  questions.forEach((question) => {
    const response = responses[question.id];
    let questionScore = 0;

    if (response !== undefined) {
      // Check if the response is an array (checkbox input) before calculating the score
      if (Array.isArray(response)) {
        response.forEach((ele) => {
          questionScore += findOptionScore(ele, question, maxPointsPerQuestion);
        });
      } else {
        questionScore += findOptionScore(
          response,
          question,
          maxPointsPerQuestion
        );
      }
    }

    // Ensure the score for this question does not exceed the max points per question
    totalScore += Math.min(questionScore, maxPointsPerQuestion);
  });

  // Ensure the total score does not exceed 100
  totalScore = Math.min(totalScore, 100);

  // Round the total score to the nearest integer
  totalScore = round(totalScore, 0);

  return totalScore;
};

export function Questionnaire() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const storedResponses = sessionStorage.getItem("questionnaire");
  const [hasResponses, setHasResponses] = useState<boolean | null>(null);
  const [retakeMode, setRetakeMode] = useState<boolean>(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkForSavedResponses = async () => {
      const exists = await hasSavedResponse();
      setHasResponses(exists);
    };
    checkForSavedResponses();
  }, []);

  // State to keep track of the current question number and responses
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [responses, setResponses] = useState<Responses>(
    storedResponses ? JSON.parse(storedResponses) : {}
  );

  // Map questions from JSON data
  const questions: Question[] = questionData.questions.map((question) => ({
    ...question,
    type: question.type as Type,
  }));

  // When component mounts, determine currentQuestion from URL, sessionStorage, or DB (if authenticated)
  useEffect(() => {
    const loadCurrentQuestion = async () => {
      if (questionId) {
        setCurrentQuestion(parseInt(questionId));
      } else if (
        !isAuthenticated &&
        sessionStorage.getItem("currentQuestion")
      ) {
        setCurrentQuestion(
          parseInt(sessionStorage.getItem("currentQuestion")!)
        );
      } else {
        setCurrentQuestion(0);
      }
    };

    loadCurrentQuestion();
  }, [questionId, isAuthenticated]);

  // Fetch progress from the DB for authenticated users
  useEffect(() => {
    const fetchProgress = async () => {
      const progressData = await getQuestionnaireProgress();
      if (progressData) {
        if (progressData.responses) {
          setResponses(progressData.responses);
        }
        if (progressData.currentQuestion) {
          setCurrentQuestion(progressData.currentQuestion);
        }
        const totalQuestions = questionData.questions.length;
        if (
          progressData.currentQuestion === totalQuestions &&
          progressData.responses &&
          progressData.responses[totalQuestions] !== undefined
        ) {
          setRetakeMode(true);
        } else {
          setRetakeMode(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchProgress();
    }
  }, [isAuthenticated]);

  // Save current question in local storage or DB based on auth status
  useEffect(() => {
    if (!isAuthenticated && currentQuestion > 0) {
      sessionStorage.setItem("currentQuestion", currentQuestion.toString());
    }
  }, [currentQuestion, isAuthenticated]);

  if (retakeMode) {
    return (
      <RetakeQuestionnaire
        resetResponses={() => {
          setResponses({});
          setCurrentQuestion(1);
          setRetakeMode(false);
        }}
      />
    );
  }

  // Handle response change
  const handleResponseChange = (
    questionId: number,
    response: number | number[]
  ) => {
    const updatedResponses = { ...responses, [questionId]: response };
    setResponses(updatedResponses);

    if (isAuthenticated) {
      saveQuestionnaireProgress({
        responses: updatedResponses,
        currentQuestion,
      });
    } else {
      sessionStorage.setItem("questionnaire", JSON.stringify(updatedResponses));
    }
  };

  // Navigate to the next question and save progress if authenticated
  const handleNext = () => {
    if (currentQuestion < questions.length) {
      const newQuestion = currentQuestion + 1;
      setCurrentQuestion(newQuestion);
      if (isAuthenticated) {
        saveQuestionnaireProgress({ responses, currentQuestion: newQuestion });
      } else {
        sessionStorage.setItem("currentQuestion", newQuestion.toString());
      }
      navigate(`${RoutePaths.QUESTIONNAIRE}/${newQuestion}`);
    }
  };

  // Navigate to the previous question and save progress if authenticated
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      const newQuestion = currentQuestion - 1;
      setCurrentQuestion(newQuestion);
      if (isAuthenticated) {
        saveQuestionnaireProgress({ responses, currentQuestion: newQuestion });
      } else {
        sessionStorage.setItem("currentQuestion", newQuestion.toString());
      }
      navigate(`${RoutePaths.QUESTIONNAIRE}/${newQuestion}`);
    }
  };

  // Exit questionnaire and go back to welcome page when not authenticated
  const handleQuit = () => {
    navigate("/");
  };

  // Handle the submission of the questionnaire
  const handleSubmit = async () => {
    const totalScore = calculateTotalScore(questions, responses);
    // Clear local storage
    sessionStorage.removeItem("questionnaire");
    sessionStorage.removeItem("currentQuestion");

    if (isAuthenticated) {
      try {
        await saveQuestionnaireResponse({ responses, totalScore });
        console.log("Successfully saved questionnaire response.");
      } catch (error) {
        console.error("Error submitting questionnaire:", error);
      }
      navigate(RoutePaths.RESULTS);
    } else {
      // For guests, continue to use local storage
      sessionStorage.setItem("questionnaire", JSON.stringify(responses));
      sessionStorage.setItem("totalScore", totalScore.toString());
      navigate(RoutePaths.WELCOME_RESULTS);
    }
  };

  // Determine if "Next" or "Submit" buttons should be disabled
  const currentQuestionType = questions[currentQuestion - 1]?.type;
  const isNextDisabled =
    currentQuestionType !== Type.RANGE &&
    (responses[currentQuestion] === undefined ||
      responses[currentQuestion] === null);

  const isSubmitDisabled =
    currentQuestion === questions.length &&
    (responses[questions.length] === undefined ||
      responses[questions.length] === null);

  // Reset responses when retaking the questionnaire
  const resetResponses = () => {
    setResponses({});
    setCurrentQuestion(1);
  };

  // Render the start/questionnaire page
  if (currentQuestion === 0) {
    if (hasResponses === null) {
      return <div>Loading...</div>;
    }

    // Only show retake if responses exist and the questionnaire is complete (retakeMode is true)
    if (hasResponses && retakeMode) {
      return <RetakeQuestionnaire resetResponses={resetResponses} />;
    }

    return <StartQuestionnaire isAuthenticated={isAuthenticated} />;
  }

  // Render the questionnaire pages
  return (
    <PageBackground>
      <LandingContainer>
        <QuestionnaireCardContainer $isAuthenticated={isAuthenticated}>
          <QuestionnaireCard>
            <QuesContainer>
              <ProgressBar>
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`progress-segment ${
                      index < currentQuestion ? "filled" : ""
                    }`}
                  ></div>
                ))}
              </ProgressBar>
              <ProgressIndicator>
                Question {currentQuestion} / {questions.length}
              </ProgressIndicator>
              <RenderQuestions
                {...questions[currentQuestion - 1]}
                onResponseChange={handleResponseChange}
                initialResponse={responses[currentQuestion]}
              />
              <div>
                {!isAuthenticated && (
                  <QuitButton onClick={handleQuit}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Quit
                  </QuitButton>
                )}
                <NavigationButton
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                >
                  Previous
                </NavigationButton>
                {currentQuestion === questions.length ? (
                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                  >
                    Submit
                  </SubmitButton>
                ) : (
                  <NavigationButton
                    onClick={handleNext}
                    disabled={isNextDisabled}
                  >
                    Next
                  </NavigationButton>
                )}
              </div>
            </QuesContainer>
          </QuestionnaireCard>
        </QuestionnaireCardContainer>
      </LandingContainer>
    </PageBackground>
  );
}
