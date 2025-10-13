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
import {
  ModernAssessmentContainer,
  AssessmentHeader,
  QuestionContent,
  ActionSection,
  ProgressBar,
  ProgressIndicator,
  SubmitButton,
  QuitButton,
  ErrorMessage,
} from "./styles/QuestionnaireStyles";
import {
  createResponseChangeHandler,
  createNextHandler,
  createPreviousHandler,
  createQuitHandler,
  createSubmitHandler,
} from "./utils/questionnaire-utils";

// Main questionnaire component with progress tracking and navigation
export function Questionnaire() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const questions: Question[] = questionData.questions.map((q: any) => ({
    ...q,
    type: q.type as QuestionType,
  }));

  // State management for questionnaire
  const [responses, setResponses] = useState<Responses>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [retakeMode, setRetakeMode] = useState(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] =
    useState(false);
  const [isRetaking, setIsRetaking] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [hasInProgressQuestionnaire, setHasInProgressQuestionnaire] =
    useState(false);

  // Check for existing completed questionnaire
  const { data: hasSavedResponseData, isLoading: isLoadingResponses } =
    useHasSavedResponse();

  // Save questionnaire response mutation
  const {
    mutateAsync: saveResponseMutate,
    status,
    error: saveError,
  } = useSaveQuestionnaireResponse();
  const isSaving = status === "pending";

  // Save progress mutation
  const { mutateAsync: saveProgressMutate } = useSaveQuestionnaireProgress();

  // Get questionnaire progress
  const { data: progressData, isLoading: isLoadingProgress } =
    useGetQuestionnaireProgress();

  // Handle completed questionnaire state
  useEffect(() => {
    if (hasSavedResponseData) {
      setHasCompletedQuestionnaire(true);
      if (!questionId && !isRetaking && !hasInProgressQuestionnaire) {
        setRetakeMode(true);
      }
    } else {
      setHasCompletedQuestionnaire(false);
      setRetakeMode(false);
      setIsRetaking(false);
      if (!questionId) {
        setCurrentQuestion(0);
      }
    }

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

  // Handle questionnaire progress and navigation
  useEffect(() => {
    if (!progressData || isLoadingProgress) return;

    if (
      progressData.responses &&
      Object.keys(progressData.responses).length > 0
    ) {
      if (!isRetaking) {
        setResponses(progressData.responses);
      }

      if (progressData.currentQuestion > 0) {
        setHasInProgressQuestionnaire(true);
        setRetakeMode(false);

        if (!questionId) {
          setCurrentQuestion(progressData.currentQuestion);
          navigate(
            `${RoutePaths.QUESTIONNAIRE}/${progressData.currentQuestion}`,
            { replace: true }
          );
        } else {
          const parsedId = parseInt(questionId);
          if (parsedId !== currentQuestion) {
            setCurrentQuestion(parsedId);
          }
        }
      } else {
        setHasInProgressQuestionnaire(false);
        if (!questionId || currentQuestion === 0) {
          setHasCompletedQuestionnaire(true);
        }
      }
    } else {
      setHasInProgressQuestionnaire(false);
    }

    setInitialLoadDone(true);
  }, [
    progressData,
    isRetaking,
    questionId,
    isLoadingProgress,
    currentQuestion,
    navigate,
  ]);

  // Handle URL parameter changes
  useEffect(() => {
    if (questionId && parseInt(questionId) !== currentQuestion) {
      const parsedQuestionId = parseInt(questionId);
      setCurrentQuestion(parsedQuestionId);

      if (parsedQuestionId > 0 && hasCompletedQuestionnaire && !isRetaking) {
        setIsRetaking(true);
        setRetakeMode(false);
      }
    }
  }, [questionId, currentQuestion, hasCompletedQuestionnaire, isRetaking]);

  // Determine retake screen visibility
  useEffect(() => {
    if (!initialLoadDone) return;

    const hasCompletedProgress =
      progressData?.responses &&
      Object.keys(progressData.responses).length > 0 &&
      (!progressData.currentQuestion || progressData.currentQuestion === 0);

    const hasActiveProgress =
      progressData?.responses &&
      Object.keys(progressData.responses).length > 0 &&
      progressData.currentQuestion > 0;

    if (
      hasCompletedQuestionnaire &&
      (currentQuestion === 0 || !questionId) &&
      !isRetaking &&
      hasCompletedProgress &&
      !hasActiveProgress
    ) {
      setRetakeMode(true);
      setHasInProgressQuestionnaire(false);
    } else if (
      isRetaking ||
      (questionId && parseInt(questionId) > 0) ||
      hasActiveProgress
    ) {
      setRetakeMode(false);
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

  // Show loading state
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

  // Show retake screen
  if (retakeMode && hasCompletedQuestionnaire) {
    return (
      <RetakeQuestionnaire
        resetResponses={() => {
          setCurrentQuestion(1);
          setRetakeMode(false);
          setIsRetaking(true);
          setHasInProgressQuestionnaire(false);
          navigate(`${RoutePaths.QUESTIONNAIRE}/1`);
        }}
      />
    );
  }

  // Create navigation and response handlers
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

  // Show start screen
  if (currentQuestion === 0) {
    return <StartQuestionnaire isAuthenticated={isAuthenticated} />;
  }

  // Navigation button states
  const currentQuestionType = questions[currentQuestion - 1]?.type;
  const isNextDisabled =
    currentQuestionType !== QuestionType.RANGE &&
    (responses[currentQuestion] === undefined ||
      responses[currentQuestion] === null);

  const isSubmitDisabled =
    currentQuestion === questions.length &&
    (responses[questions.length] === undefined ||
      responses[questions.length] === null);

  // Main questionnaire view
  return (
    <PageBackground>
      <LandingContainer>
        <ModernAssessmentContainer $isAuthenticated={isAuthenticated}>
          <AssessmentHeader>
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
          </AssessmentHeader>

          <QuestionContent>
            <RenderQuestions
              {...questions[currentQuestion - 1]}
              onResponseChange={handleResponseChange}
              initialResponse={responses[currentQuestion]}
            />
          </QuestionContent>

          <ActionSection>
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
              <NavigationButton onClick={handleNext} disabled={isNextDisabled}>
                Next
              </NavigationButton>
            )}
          </ActionSection>

          {saveError && <ErrorMessage>Error: {saveError.message}</ErrorMessage>}
        </ModernAssessmentContainer>
      </LandingContainer>
    </PageBackground>
  );
}
