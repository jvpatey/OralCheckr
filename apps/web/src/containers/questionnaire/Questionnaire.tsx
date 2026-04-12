import { useState, useEffect, useContext, useRef, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import questionData from "../../common/questionnaire.json";
import { PageBackground } from "../../components/PageBackground";
import { LandingContainer } from "../../components/landing/LandingContainer";
import { QuestionnaireCardContainer } from "../../components/questionnaire/styles/QuestionnaireCardContainer";
import { QuestionnaireCard } from "../../components/questionnaire/styles/QuestionnaireCard";
import { RenderQuestions } from "./RenderQuestions";
import { RoutePaths } from "../../common/constants/routes";
import { StartQuestionnaire } from "../../components/questionnaire/StartQuestionnaire";
import { RetakeQuestionnaire } from "./RetakeQuestionnaire";
import { BackgroundEffects } from "../welcome/styles/WelcomeStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../authentication/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useSaveQuestionnaireResponse } from "../../hooks/questionnaire/useSaveQuestionnaireResponse";
import { useSaveQuestionnaireProgress } from "../../hooks/questionnaire/useSaveQuestionnaireProgress";
import { useQuestionnaireResponseQuery } from "../../hooks/questionnaire/useQuestionnaireResponseQuery";
import type { QuestionnaireResponse } from "../../services/quesService";
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
  QuestionFadeWrapper,
  QuestionPanel,
  ActionSection,
  ProgressRoot,
  ProgressTrack,
  ProgressFill,
  ProgressPercentInside,
  ProgressLabelsRow,
  ProgressIndicator,
  ErrorMessage,
} from "./styles/QuestionnaireStyles";
import {
  QuestionnaireFlowPrimaryButton,
  QuestionnaireFlowSecondaryButton,
  QuestionnaireFlowDangerButton,
} from "../../components/questionnaire/styles/QuestionnaireFlowLayout";
import {
  createResponseChangeHandler,
  createNextHandler,
  createPreviousHandler,
  createQuitHandler,
  createSubmitHandler,
} from "./utils/questionnaire-utils";
import {
  isFullyCompletedQuestionnaire,
  hasEverSubmittedQuestionnaire,
} from "./utils/questionnaire-completion";

function responsesFromRecord(
  raw: Record<number, number | number[]> | Record<string, number | number[]> | undefined
): Responses {
  if (!raw || typeof raw !== "object") return {};
  const out: Responses = {};
  for (const [k, v] of Object.entries(raw)) {
    const nk = parseInt(k, 10);
    if (!Number.isNaN(nk)) {
      out[nk] = v as number | number[];
    }
  }
  return out;
}

export function Questionnaire() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  const questions: Question[] = questionData.questions.map((q: any) => ({
    ...q,
    type: q.type as QuestionType,
  }));

  const questionCount = questions.length;

  const [responses, setResponses] = useState<Responses>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRetaking, setIsRetaking] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [, setHasInProgressQuestionnaire] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState(currentQuestion);
  const prevQuestionRef = useRef(currentQuestion);
  const [, setLocalCompleted] = useState(false);

  const {
    data: record,
    isLoading: isLoadingRecord,
    isFetched: recordFetched,
  } = useQuestionnaireResponseQuery();

  const {
    mutateAsync: saveResponseMutate,
    status,
    error: saveError,
  } = useSaveQuestionnaireResponse();
  const isSaving = status === "pending";

  const { mutateAsync: saveProgressMutate } = useSaveQuestionnaireProgress();
  const queryClient = useQueryClient();

  const hasEverSubmitted = useMemo(
    () => hasEverSubmittedQuestionnaire(record, questionCount),
    [record, questionCount]
  );

  // Retake flow: only from explicit navigation state (see RetakeQuestionnaire confirm).
  useEffect(() => {
    const s = location.state as { questionnaireIntent?: string } | null;
    if (s?.questionnaireIntent !== "retake") return;
    setIsRetaking(true);
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
      },
      { replace: true, state: {} }
    );
  }, [location.state, location.pathname, location.search, location.hash, navigate]);

  // Hydrate from GET /questionnaire/response (same row as progress).
  useEffect(() => {
    if (!recordFetched || isLoadingRecord) return;

    if (!record) {
      setResponses({});
      setHasInProgressQuestionnaire(false);
      if (questionId) {
        const parsed = parseInt(questionId, 10);
        if (!Number.isNaN(parsed) && parsed >= 0) {
          setCurrentQuestion(parsed);
        }
      } else {
        setCurrentQuestion(0);
      }
      setInitialLoadDone(true);
      return;
    }

    setResponses(responsesFromRecord(record.responses));

    const fullyDone = isFullyCompletedQuestionnaire(record, questionCount);

    if (record.currentQuestion > 0) {
      setHasInProgressQuestionnaire(true);
      if (!questionId) {
        setCurrentQuestion(record.currentQuestion);
        navigate(
          `${RoutePaths.QUESTIONNAIRE}/${record.currentQuestion}`,
          { replace: true }
        );
      } else {
        const parsed = parseInt(questionId, 10);
        if (Number.isNaN(parsed)) {
          setCurrentQuestion(record.currentQuestion);
        } else if (parsed !== record.currentQuestion) {
          setCurrentQuestion(record.currentQuestion);
          navigate(
            `${RoutePaths.QUESTIONNAIRE}/${record.currentQuestion}`,
            { replace: true }
          );
        } else {
          setCurrentQuestion(parsed);
        }
      }
    } else {
      setHasInProgressQuestionnaire(false);
      if (!questionId) {
        setCurrentQuestion(0);
      } else {
        const parsed = parseInt(questionId, 10);
        if (!Number.isNaN(parsed) && parsed > 0 && fullyDone) {
          navigate(RoutePaths.QUESTIONNAIRE, { replace: true });
          setCurrentQuestion(0);
        } else if (!Number.isNaN(parsed)) {
          setCurrentQuestion(parsed);
        }
      }
    }

    setInitialLoadDone(true);
  }, [
    record,
    recordFetched,
    isLoadingRecord,
    questionId,
    questionCount,
    navigate,
  ]);

  useEffect(() => {
    if (prevQuestionRef.current !== currentQuestion && currentQuestion > 0) {
      setIsTransitioning(true);

      const updateTimer = setTimeout(() => {
        setDisplayedQuestion(currentQuestion);
      }, 75);

      const fadeInTimer = setTimeout(() => {
        setIsTransitioning(false);
        prevQuestionRef.current = currentQuestion;
      }, 150);

      return () => {
        clearTimeout(updateTimer);
        clearTimeout(fadeInTimer);
      };
    } else if (currentQuestion > 0 && displayedQuestion !== currentQuestion) {
      setDisplayedQuestion(currentQuestion);
    }
  }, [currentQuestion, displayedQuestion]);

  const showRetakeScreen =
    initialLoadDone &&
    recordFetched &&
    !isLoadingRecord &&
    record != null &&
    !questionId &&
    !isRetaking &&
    isFullyCompletedQuestionnaire(record, questionCount) &&
    record.currentQuestion === 0;

  if (isLoadingRecord && isInitialMount) {
    return (
      <PageBackground>
        <BackgroundEffects />
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

  if (!isLoadingRecord && isInitialMount) {
    setTimeout(() => setIsInitialMount(false), 0);
  }

  const resetForRetake = useCallback(async () => {
    setResponses({});
    setHasInProgressQuestionnaire(false);
    setCurrentQuestion(1);
    try {
      await saveProgressMutate({ responses: {}, currentQuestion: 1 });
    } catch {
      /* non-blocking */
    }
    queryClient.setQueryData(
      ["questionnaireResponse"],
      (prev: QuestionnaireResponse | null | undefined) =>
        prev
          ? {
              ...prev,
              responses: {} as QuestionnaireResponse["responses"],
              currentQuestion: 1,
            }
          : prev
    );
    navigate(`${RoutePaths.QUESTIONNAIRE}/1`, {
      replace: true,
      state: { questionnaireIntent: "retake" },
    });
  }, [navigate, queryClient, saveProgressMutate]);

  if (showRetakeScreen) {
    return <RetakeQuestionnaire resetResponses={resetForRetake} />;
  }

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
    hasEverSubmitted,
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
    setLocalCompleted,
    setIsRetaking,
    setHasInProgressQuestionnaire,
    saveProgressMutate,
    navigate
  );

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

  /** Keep bar/labels aligned with the faded question, not the step ahead during transition */
  const progressStep = displayedQuestion;
  const progressPercent = Math.round(
    (progressStep / questions.length) * 100
  );

  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer>
        <ModernAssessmentContainer $isAuthenticated={isAuthenticated}>
          <AssessmentHeader>
            <ProgressRoot
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={progressStep}
              aria-valuetext={`${progressPercent}% complete, question ${progressStep} of ${questions.length}`}
              aria-label="Questionnaire progress"
            >
              <ProgressTrack>
                <ProgressFill
                  $percent={(progressStep / questions.length) * 100}
                />
                <ProgressPercentInside aria-hidden="true">
                  {progressPercent}%
                </ProgressPercentInside>
              </ProgressTrack>
            </ProgressRoot>

            <ProgressLabelsRow>
              <ProgressIndicator>
                Question {progressStep} of {questions.length}
              </ProgressIndicator>
            </ProgressLabelsRow>
          </AssessmentHeader>

          <QuestionContent>
            <QuestionFadeWrapper
              className={isTransitioning ? "fade-out" : "fade-in"}
            >
              <QuestionPanel>
                <RenderQuestions
                  {...questions[displayedQuestion - 1]}
                  onResponseChange={handleResponseChange}
                  initialResponse={responses[displayedQuestion]}
                  questionId={displayedQuestion}
                />
              </QuestionPanel>
            </QuestionFadeWrapper>
          </QuestionContent>

          <ActionSection>
            <QuestionnaireFlowDangerButton onClick={handleQuit}>
              <FontAwesomeIcon icon={faArrowLeft} aria-hidden />
              {hasEverSubmitted ? "Exit to Results" : "Quit"}
            </QuestionnaireFlowDangerButton>

            <QuestionnaireFlowSecondaryButton
              onClick={handlePrevious}
              disabled={currentQuestion === 1}
            >
              Previous
            </QuestionnaireFlowSecondaryButton>

            {currentQuestion === questions.length ? (
              <QuestionnaireFlowPrimaryButton
                onClick={handleSubmit}
                disabled={isSubmitDisabled || isSaving}
              >
                {isSaving ? "Submitting..." : "Submit"}
              </QuestionnaireFlowPrimaryButton>
            ) : (
              <QuestionnaireFlowPrimaryButton
                onClick={handleNext}
                disabled={isNextDisabled}
              >
                Next
              </QuestionnaireFlowPrimaryButton>
            )}
          </ActionSection>

          {saveError && <ErrorMessage>Error: {saveError.message}</ErrorMessage>}
        </ModernAssessmentContainer>
      </LandingContainer>
    </PageBackground>
  );
}
