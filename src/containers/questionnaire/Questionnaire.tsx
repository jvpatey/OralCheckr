import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questionData from "../../common/questionnaire.json";
import { PageBackground } from "../../components/PageBackground";
import { LandingContainer } from "../../components/landing/LandingContainer";
import { QuestionnaireCardContainer } from "../../components/questionnaire/styles/QuestionnaireCardContainer";
import { QuestionnaireCard } from "../../components/questionnaire/styles/QuestionnaireCard";
import { RenderQuestions } from "./RenderQuestions";
import { RoutePaths } from "../../common/constants/routes";
import { StartQuestionnaire } from "../../components/questionnaire/StartQuestionnaire";
import { RetakeQuestionnaire } from "./RetakeQuestionnaire";
import { NavigationButton } from "../../components/questionnaire/styles/NavigationButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../authentication/AuthContext";
import { useSaveQuestionnaireResponse } from "../../hooks/questionnaire/useSaveQuestionnaireResponse";
import { useHasSavedResponse } from "../../hooks/questionnaire/useHasSavedResponse";
import { useSaveQuestionnaireProgress } from "../../hooks/questionnaire/useSaveQuestionnaireProgress";
import { useGetQuestionnaireProgress } from "../../hooks/questionnaire/useGetQuestionnaireProgress";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import {
  Question,
  QuestionType,
  Responses,
} from "../../common/types/questionnaire/questionnaire.types";
import { ButtonContainer } from "../../components/questionnaire/styles/SharedQuestionnaireStyles";
import {
  QuesContainer,
  ProgressBar,
  ProgressIndicator,
  SubmitButton,
  QuitButton,
} from "./styles/QuestionnaireStyles";
import {
  createResponseChangeHandler,
  createNextHandler,
  createPreviousHandler,
  createQuitHandler,
  createSubmitHandler,
} from "./utils/questionnaire-utils";

export function Questionnaire() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const questions: Question[] = questionData.questions.map((q: any) => ({
    ...q,
    type: q.type as QuestionType,
  }));

  const [responses, setResponses] = useState<Responses>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [retakeMode, setRetakeMode] = useState(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] =
    useState(false);
  const [isRetaking, setIsRetaking] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [hasInProgressQuestionnaire, setHasInProgressQuestionnaire] =
    useState(false);

  // Check if saved responses exist (completed questionnaire)
  const { data: hasSavedResponseData, isLoading: isLoadingResponses } =
    useHasSavedResponse();

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

  // Determine if user has completed the questionnaire before
  useEffect(() => {
    if (hasSavedResponseData) {
      setHasCompletedQuestionnaire(true);

      // Show retake screen at root path if not already retaking
      if (!questionId && !isRetaking && !hasInProgressQuestionnaire) {
        setRetakeMode(true);
      }
    } else {
      // Reset state when there's no saved response
      setHasCompletedQuestionnaire(false);
      setRetakeMode(false);
      setIsRetaking(false);
      if (!questionId) {
        setCurrentQuestion(0);
      }
    }

    // Mark initial load complete
    if (!isLoadingResponses) {
      setInitialLoadDone((prevState) => prevState || !isLoadingResponses);
    }
  }, [
    hasSavedResponseData,
    isLoadingResponses,
    questionId,
    isRetaking,
    hasInProgressQuestionnaire,
  ]);

  // Modify the progress data effect to be careful with navigation
  useEffect(() => {
    if (!progressData || isLoadingProgress) return;

    // Check if there's any saved responses
    if (
      progressData.responses &&
      Object.keys(progressData.responses).length > 0
    ) {
      // Always load saved responses if not actively retaking
      if (!isRetaking) {
        setResponses(progressData.responses);
      }

      // Active questionnaire (currentQuestion > 0)
      if (progressData.currentQuestion > 0) {
        setHasInProgressQuestionnaire(true);
        setRetakeMode(false);

        // Only navigate if necessary and no explicit questionId is provided
        if (!questionId) {
          setCurrentQuestion(progressData.currentQuestion);
          // Use replace instead of push to avoid adding to history stack
          navigate(
            `${RoutePaths.QUESTIONNAIRE}/${progressData.currentQuestion}`,
            { replace: true }
          );
        } else {
          const parsedId = parseInt(questionId);
          // Update local state to match URL if different
          if (parsedId !== currentQuestion) {
            setCurrentQuestion(parsedId);
          }
        }
      } else {
        // Completed questionnaire (currentQuestion = 0)
        setHasInProgressQuestionnaire(false);

        // If at root, show retake screen
        if (!questionId || currentQuestion === 0) {
          setHasCompletedQuestionnaire(true);
        }
      }
    } else {
      // No saved responses
      setHasInProgressQuestionnaire(false);
    }

    // Mark progress data loaded
    setInitialLoadDone(true);
  }, [
    progressData,
    isRetaking,
    questionId,
    isLoadingProgress,
    currentQuestion,
    navigate,
  ]);

  // Simplify the URL parameter handler to avoid conflicts with the progress effect
  useEffect(() => {
    // Only respond to URL changes if we have explicit questionId and it's different from current
    if (questionId && parseInt(questionId) !== currentQuestion) {
      const parsedQuestionId = parseInt(questionId);

      // Update current question from URL
      setCurrentQuestion(parsedQuestionId);

      // Handle retake mode if needed
      if (parsedQuestionId > 0 && hasCompletedQuestionnaire && !isRetaking) {
        setIsRetaking(true);
        setRetakeMode(false);
      }
    }
  }, [questionId, currentQuestion, hasCompletedQuestionnaire, isRetaking]);

  // Determine if we should show the retake screen
  useEffect(() => {
    // Wait for initial data load
    if (!initialLoadDone) return;

    // Check for completed questionnaire (responses exist but currentQuestion = 0)
    const hasCompletedProgress =
      progressData?.responses &&
      Object.keys(progressData.responses).length > 0 &&
      (!progressData.currentQuestion || progressData.currentQuestion === 0);

    // Check for in-progress questionnaire (currentQuestion > 0)
    const hasActiveProgress =
      progressData?.responses &&
      Object.keys(progressData.responses).length > 0 &&
      progressData.currentQuestion > 0;

    // Show retake screen only for completed questionnaires at root path
    // and when there's no active in-progress questionnaire
    if (
      hasCompletedQuestionnaire &&
      (currentQuestion === 0 || !questionId) &&
      !isRetaking &&
      hasCompletedProgress &&
      !hasActiveProgress
    ) {
      setRetakeMode(true);
      // Ensure not marked as in-progress
      setHasInProgressQuestionnaire(false);
    } else if (
      isRetaking ||
      (questionId && parseInt(questionId) > 0) ||
      hasActiveProgress
    ) {
      setRetakeMode(false);

      // If we have an active questionnaire, make sure it's marked as in-progress
      if (hasActiveProgress) {
        setHasInProgressQuestionnaire(true);
      }
    }
  }, [
    hasCompletedQuestionnaire,
    currentQuestion,
    isRetaking,
    questionId,
    initialLoadDone,
    progressData,
  ]);

  if (isLoadingResponses || isLoadingProgress) {
    return (
      <PageBackground>
        <LandingContainer>
          <QuestionnaireCardContainer $isAuthenticated={isAuthenticated}>
            <QuestionnaireCard>
              <LoadingSpinner fullHeight />
            </QuestionnaireCard>
          </QuestionnaireCardContainer>
        </LandingContainer>
      </PageBackground>
    );
  }

  // Show retake screen if conditions are met
  if (retakeMode && hasCompletedQuestionnaire) {
    return (
      <RetakeQuestionnaire
        resetResponses={() => {
          // Start retake with previous responses
          setCurrentQuestion(1);
          setRetakeMode(false);
          setIsRetaking(true);
          setHasInProgressQuestionnaire(false);
          navigate(`${RoutePaths.QUESTIONNAIRE}/1`);
        }}
      />
    );
  }

  // Create handler functions
  const handleResponseChange = createResponseChangeHandler(
    responses,
    setResponses,
    setHasInProgressQuestionnaire,
    saveProgressMutate,
    currentQuestion
  );

  const handleNext = createNextHandler(
    currentQuestion,
    questions,
    setCurrentQuestion,
    setHasInProgressQuestionnaire,
    saveProgressMutate,
    responses,
    navigate
  );

  const handlePrevious = createPreviousHandler(
    currentQuestion,
    setCurrentQuestion,
    saveProgressMutate,
    responses,
    navigate
  );

  const handleQuit = createQuitHandler(
    hasCompletedQuestionnaire,
    saveProgressMutate,
    responses,
    setIsRetaking,
    setHasInProgressQuestionnaire,
    navigate
  );

  const handleSubmit = createSubmitHandler(
    questions,
    responses,
    saveResponseMutate,
    setHasCompletedQuestionnaire,
    setIsRetaking,
    setHasInProgressQuestionnaire,
    saveProgressMutate,
    navigate
  );

  // If currentQuestion is 0, show the start screen
  if (currentQuestion === 0) {
    return <StartQuestionnaire isAuthenticated={isAuthenticated} />;
  }

  const currentQuestionType = questions[currentQuestion - 1]?.type;
  const isNextDisabled =
    currentQuestionType !== QuestionType.RANGE &&
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
                {questions.map((_, idx: number) => (
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

              <ButtonContainer>
                <QuitButton onClick={handleQuit}>
                  <FontAwesomeIcon icon={faArrowLeft} />{" "}
                  {hasCompletedQuestionnaire ? "Exit to Results" : "Quit"}
                </QuitButton>

                <NavigationButton
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                >
                  Previous
                </NavigationButton>

                {currentQuestion === questions.length ? (
                  <SubmitButton
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled || isSaving}
                  >
                    {isSaving ? "Submitting..." : "Submit"}
                  </SubmitButton>
                ) : (
                  <NavigationButton
                    onClick={handleNext}
                    disabled={isNextDisabled}
                  >
                    Next
                  </NavigationButton>
                )}
              </ButtonContainer>

              {saveError && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  Error: {saveError.message}
                </div>
              )}
            </QuesContainer>
          </QuestionnaireCard>
        </QuestionnaireCardContainer>
      </LandingContainer>
    </PageBackground>
  );
}
