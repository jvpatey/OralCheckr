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
import { AuthContext } from "../authentication/AuthContext";
import { useSaveQuestionnaireResponse } from "../../hooks/questionnaire/useSaveQuestionnaireResponse";
import { useHasSavedResponse } from "../../hooks/questionnaire/useHasSavedResponse";
import { useSaveQuestionnaireProgress } from "../../hooks/questionnaire/useSaveQuestionnaireProgress";
import { useGetQuestionnaireProgress } from "../../hooks/questionnaire/useGetQuestionnaireProgress";

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
    totalScore += Math.min(questionScore, maxPointsPerQuestion);
  });
  totalScore = Math.min(totalScore, 100);
  totalScore = round(totalScore, 0);

  return totalScore;
};

export function Questionnaire() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [responses, setResponses] = useState<Responses>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [retakeMode, setRetakeMode] = useState(false);

  // Check if saved responses exist
  const { isLoading: isLoadingResponses } = useHasSavedResponse();

  // Mutation hook for saving questionnaire responses (final submission)
  const {
    mutateAsync: saveResponseMutate,
    status,
    error: saveError,
  } = useSaveQuestionnaireResponse();
  const isSaving = status === "pending";

  // mutation hook for saving progress
  const { mutateAsync: saveProgressMutate } = useSaveQuestionnaireProgress();

  // React Query hook to fetch progress
  const { data: progressData, isLoading: isLoadingProgress } =
    useGetQuestionnaireProgress();

  // Determine currentQuestion from URL or progress data
  useEffect(() => {
    if (questionId) {
      setCurrentQuestion(parseInt(questionId));
    } else {
      setCurrentQuestion(0);
    }
  }, [questionId]);

  // Update progress when the hook returns data
  useEffect(() => {
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
      }
    }
  }, [progressData]);

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

  if (isLoadingResponses || isLoadingProgress) {
    return <div>Loading...</div>;
  }

  const questions: Question[] = questionData.questions.map((q) => ({
    ...q,
    type: q.type as Type,
  }));

  // Handle response change
  const handleResponseChange = async (
    qid: number,
    response: number | number[]
  ) => {
    const updated = { ...responses, [qid]: response };
    setResponses(updated);

    try {
      await saveProgressMutate({ responses: updated, currentQuestion });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  };

  // Navigate to the next question
  const handleNext = async () => {
    if (currentQuestion < questions.length) {
      const newQuestion = currentQuestion + 1;
      setCurrentQuestion(newQuestion);

      try {
        await saveProgressMutate({ responses, currentQuestion: newQuestion });
      } catch (err) {
        console.error("Error saving progress:", err);
      }

      navigate(`${RoutePaths.QUESTIONNAIRE}/${newQuestion}`);
    }
  };

  // Navigate to the previous question
  const handlePrevious = async () => {
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

  // Exit questionnaire
  const handleQuit = () => {
    navigate("/");
  };

  // Handle the submission of the questionnaire
  const handleSubmit = async () => {
    const totalScore = calculateTotalScore(questions, responses);

    try {
      // Save final progress before submission
      await saveProgressMutate({ responses, currentQuestion });
      await saveResponseMutate({ responses, totalScore });
      console.log("Successfully saved questionnaire response.");
    } catch (err) {
      console.error("Error submitting questionnaire:", err);
    }

    // Navigate to appropriate results page
    if (isAuthenticated) {
      navigate(RoutePaths.RESULTS);
    } else {
      navigate(RoutePaths.WELCOME_RESULTS);
    }
  };

  // If currentQuestion is 0, show the start screen
  if (currentQuestion === 0) {
    return <StartQuestionnaire isAuthenticated={isAuthenticated} />;
  }

  const currentQuestionType = questions[currentQuestion - 1]?.type;
  const isNextDisabled =
    currentQuestionType !== Type.RANGE &&
    (responses[currentQuestion] === undefined ||
      responses[currentQuestion] === null);

  const isSubmitDisabled =
    currentQuestion === questions.length &&
    (responses[questions.length] === undefined ||
      responses[questions.length] === null);

  return (
    <PageBackground>
      <LandingContainer>
        <QuestionnaireCardContainer $isAuthenticated={isAuthenticated}>
          <QuestionnaireCard>
            <QuesContainer>
              <ProgressBar>
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`progress-segment ${
                      idx < currentQuestion ? "filled" : ""
                    }`}
                  />
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
                  <>
                    <SubmitButton
                      onClick={handleSubmit}
                      disabled={isSubmitDisabled || isSaving}
                    >
                      {isSaving ? "Submitting..." : "Submit"}
                    </SubmitButton>
                    {saveError && (
                      <div style={{ color: "red", marginTop: "10px" }}>
                        Error: {saveError.message}
                      </div>
                    )}
                  </>
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
