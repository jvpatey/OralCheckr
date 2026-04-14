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
import {
  BackgroundEffects,
  HeroTitleAccent,
} from "../welcome/styles/WelcomeStyles";
import {
  HeaderMainRow,
  HeaderTitleColumn,
  HabitHeroEyebrow,
  HeaderText,
} from "../../components/habit-tracker/habits/HabitComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
  AssessmentMainColumn,
  AssessmentSectionHeader,
  AssessmentBackAndStepRow,
  QuestionnaireBackButtonCompact,
  AssessmentHeader,
  AssessmentStepLine,
  QuestionCardRow,
  QuestionNavSide,
  QuestionNavMobileBar,
  QuestionNavArrowButton,
  QuestionnaireNavSubmitButton,
  QuestionContent,
  QuestionFadeWrapper,
  QuestionPanel,
  ProgressRoot,
  ProgressTrack,
  ProgressFill,
  ProgressPercentInside,
  ErrorMessage,
} from "./styles/QuestionnaireStyles";
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

  // Question cross-fade: depend only on currentQuestion. Including displayedQuestion
  // in deps cleared timeouts when the swap fired, canceling the fade-in and restuttering the animation.
  useEffect(() => {
    if (currentQuestion <= 0) {
      setDisplayedQuestion(0);
      prevQuestionRef.current = 0;
      setIsTransitioning(false);
      return;
    }

    // First entry into the flow (e.g. /questionnaire/1 or resume): show immediately, no fade.
    if (prevQuestionRef.current === 0) {
      setDisplayedQuestion(currentQuestion);
      prevQuestionRef.current = currentQuestion;
      setIsTransitioning(false);
      return;
    }

    if (prevQuestionRef.current === currentQuestion) {
      return;
    }

    const fadeMs = 180;
    setIsTransitioning(true);

    const updateTimer = window.setTimeout(() => {
      setDisplayedQuestion(currentQuestion);
    }, fadeMs);

    const fadeInTimer = window.setTimeout(() => {
      setIsTransitioning(false);
      prevQuestionRef.current = currentQuestion;
    }, fadeMs * 2);

    return () => {
      window.clearTimeout(updateTimer);
      window.clearTimeout(fadeInTimer);
    };
  }, [currentQuestion]);

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
        <LandingContainer $compactNavClearance>
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
    setDisplayedQuestion(1);
    prevQuestionRef.current = 1;
    setIsTransitioning(false);
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
    navigate,
    queryClient
  );

  if (currentQuestion === 0) {
    return <StartQuestionnaire isAuthenticated={isAuthenticated} />;
  }

  /** Avoid questions[-1] when URL/hydration sets currentQuestion before displayedQuestion catches up */
  const visualQuestionStep =
    displayedQuestion > 0 ? displayedQuestion : currentQuestion;

  const currentQuestionObj = questions[currentQuestion - 1];
  const currentQuestionType = currentQuestionObj?.type;
  const currentQuestionKey = currentQuestionObj?.id;
  const lastQuestionKey = questions[questions.length - 1]?.id;

  const isNextDisabled =
    currentQuestionType !== QuestionType.RANGE &&
    (currentQuestionKey === undefined ||
      responses[currentQuestionKey] === undefined ||
      responses[currentQuestionKey] === null);

  const isSubmitDisabled =
    currentQuestion === questions.length &&
    (lastQuestionKey === undefined ||
      responses[lastQuestionKey] === undefined ||
      responses[lastQuestionKey] === null);

  /** Keep bar/labels aligned with the visible question */
  const progressStep = visualQuestionStep;
  const progressPercent = Math.round(
    (progressStep / questions.length) * 100
  );

  return (
    <PageBackground>
      <BackgroundEffects />
      <LandingContainer $compactNavClearance>
        <ModernAssessmentContainer $isAuthenticated={isAuthenticated}>
          <AssessmentSectionHeader>
            <HeaderMainRow>
              <HeaderTitleColumn>
                <HabitHeroEyebrow>Assess</HabitHeroEyebrow>
                <HeaderText>
                  Oral Health <HeroTitleAccent>Questionnaire</HeroTitleAccent>
                </HeaderText>
                <AssessmentBackAndStepRow>
                  <QuestionnaireBackButtonCompact
                    type="button"
                    onClick={handleQuit}
                    aria-label={
                      hasEverSubmitted
                        ? "Back to results"
                        : "Back and leave questionnaire"
                    }
                  >
                    Back
                  </QuestionnaireBackButtonCompact>
                  <AssessmentStepLine>
                    Question {progressStep} of {questions.length}
                  </AssessmentStepLine>
                </AssessmentBackAndStepRow>
              </HeaderTitleColumn>
            </HeaderMainRow>
          </AssessmentSectionHeader>

          <AssessmentMainColumn>
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
            </AssessmentHeader>

            <QuestionCardRow>
              <QuestionNavSide>
                <QuestionNavArrowButton
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                  aria-label="Previous question"
                >
                  <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                </QuestionNavArrowButton>
              </QuestionNavSide>

              <QuestionContent>
                <QuestionFadeWrapper
                  className={isTransitioning ? "fade-out" : "fade-in"}
                >
                  <QuestionPanel>
                    <RenderQuestions
                      {...questions[visualQuestionStep - 1]}
                      onResponseChange={handleResponseChange}
                      initialResponse={
                        questions[visualQuestionStep - 1]
                          ? responses[questions[visualQuestionStep - 1].id]
                          : undefined
                      }
                      questionId={visualQuestionStep}
                    />
                  </QuestionPanel>
                </QuestionFadeWrapper>
              </QuestionContent>

              <QuestionNavSide>
                {currentQuestion === questions.length ? (
                  <QuestionnaireNavSubmitButton
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled || isSaving}
                    aria-label={
                      isSaving ? "Submitting questionnaire" : "Submit questionnaire"
                    }
                  >
                    {isSaving ? "Submitting..." : "Submit"}
                  </QuestionnaireNavSubmitButton>
                ) : (
                  <QuestionNavArrowButton
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    aria-label="Next question"
                  >
                    <FontAwesomeIcon icon={faChevronRight} size="lg" />
                  </QuestionNavArrowButton>
                )}
              </QuestionNavSide>

              <QuestionNavMobileBar>
                <QuestionNavArrowButton
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                  aria-label="Previous question"
                >
                  <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                </QuestionNavArrowButton>
                {currentQuestion === questions.length ? (
                  <QuestionnaireNavSubmitButton
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled || isSaving}
                    aria-label={
                      isSaving ? "Submitting questionnaire" : "Submit questionnaire"
                    }
                  >
                    {isSaving ? "Submitting..." : "Submit"}
                  </QuestionnaireNavSubmitButton>
                ) : (
                  <QuestionNavArrowButton
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    aria-label="Next question"
                  >
                    <FontAwesomeIcon icon={faChevronRight} size="lg" />
                  </QuestionNavArrowButton>
                )}
              </QuestionNavMobileBar>
            </QuestionCardRow>

            {saveError && (
              <ErrorMessage>Error: {saveError.message}</ErrorMessage>
            )}
          </AssessmentMainColumn>
        </ModernAssessmentContainer>
      </LandingContainer>
    </PageBackground>
  );
}
