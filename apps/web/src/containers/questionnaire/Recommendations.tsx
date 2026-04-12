import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { useGetQuestionnaireResponse } from "../../hooks/questionnaire/useGetQuestionnaireResponse";
import type { Recommendation } from "../../common/types/questionnaire/recommendations.types";
import {
  generateRecommendations,
  userAlreadyTracksSuggestedHabit,
} from "./utils/recommendations-utils";
import { parseQuestionnaireResponsesFromApi } from "./utils/questionnaire-response-parse";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import {
  CardStackContainer,
  ContentArea,
  EdgeHoverZone,
  EdgeArrow,
  SlideContainer,
  CategoryHeader,
  ImprovementLabel,
  RecommendationText,
  NoRecommendations,
  KeyboardHint,
  SuggestedHabitFooter,
  SuggestedHabitHeading,
  SuggestedHabitHeadingAccent,
  SuggestedHabitDivider,
  SuggestedHabitAddButton,
  AlreadyTrackingNote,
  HabitAddedNote,
  ViewHabitTrackerButton,
  HabitActionError,
  SuggestedHabitActionsSlot,
} from "./styles/RecommendationsStyles";
import { useFetchHabits, useCreateHabit } from "../../hooks/habits";
import { handleHabitServiceError } from "../../services/habitService";
import { RoutePaths } from "../../common/constants/routes";

// Recommendations component with card stack display
const habitFooterEase = [0.22, 1, 0.36, 1] as const;

export function Recommendations() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const {
    data: questionnaireData,
    isLoading,
    error,
  } = useGetQuestionnaireResponse();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [habitAddError, setHabitAddError] = useState<string | null>(null);
  /** Exact suggested habit name we just created on this card (avoids jumping to “already tracked”). */
  const [justAddedHabitName, setJustAddedHabitName] = useState<string | null>(
    null
  );
  const [animationDirection, setAnimationDirection] = useState<
    "slideInLeft" | "slideInRight" | "slideOutLeft" | "slideOutRight" | "none"
  >("none");

  const {
    data: habits = [],
    isLoading: isLoadingHabits,
    isError: isHabitsError,
  } = useFetchHabits();
  const createHabitMutation = useCreateHabit();

  // Generate recommendations from questionnaire responses
  useEffect(() => {
    if (!questionnaireData || !questionnaireData.responses) return;

    const convertedResponses = parseQuestionnaireResponsesFromApi(
      questionnaireData.responses
    );
    const recs = generateRecommendations(convertedResponses);
    setRecommendations(recs);
  }, [questionnaireData]);

  useEffect(() => {
    setCurrentIndex((i) =>
      recommendations.length === 0
        ? 0
        : Math.min(i, recommendations.length - 1)
    );
  }, [recommendations.length]);

  useEffect(() => {
    setHabitAddError(null);
    setJustAddedHabitName(null);
  }, [currentIndex]);

  const current = recommendations[currentIndex];
  const suggestedHabit = current?.suggestedHabit;

  const alreadyTracking = useMemo(() => {
    if (
      !suggestedHabit ||
      isHabitsError ||
      isLoadingHabits
    ) {
      return false;
    }
    return userAlreadyTracksSuggestedHabit(habits, suggestedHabit.name);
  }, [suggestedHabit, habits, isHabitsError, isLoadingHabits]);

  const handleAddSuggestedHabit = useCallback(() => {
    if (!suggestedHabit) return;
    const nameAdded = suggestedHabit.name;
    setHabitAddError(null);
    createHabitMutation.mutate(
      { name: suggestedHabit.name, count: suggestedHabit.count },
      {
        onSuccess: () => {
          setHabitAddError(null);
          setJustAddedHabitName(nameAdded);
        },
        onError: (err) =>
          setHabitAddError(handleHabitServiceError(err)),
      }
    );
  }, [suggestedHabit, createHabitMutation]);

  const showAddSuccess =
    justAddedHabitName !== null &&
    suggestedHabit !== undefined &&
    justAddedHabitName === suggestedHabit.name;

  const suggestedHabitFooterKey = showAddSuccess
    ? "success"
    : alreadyTracking
      ? "already"
      : "add";

  const habitFooterTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.42,
        ease: habitFooterEase,
      };

  const habitFooterExitTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.26,
        ease: [0.4, 0, 1, 1] as const,
      };

  // Handle navigation with animations
  const handleNext = useCallback(() => {
    setCurrentIndex((ci) => {
      if (ci >= recommendations.length - 1) return ci;
      setAnimationDirection("slideOutLeft");
      setTimeout(() => {
        setCurrentIndex(ci + 1);
        setAnimationDirection("slideInRight");
      }, 200);
      return ci;
    });
  }, [recommendations.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((ci) => {
      if (ci <= 0) return ci;
      setAnimationDirection("slideOutRight");
      setTimeout(() => {
        setCurrentIndex(ci - 1);
        setAnimationDirection("slideInLeft");
      }, 200);
      return ci;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrevious]);

  // Show loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Handle 404 error (no data)
  const isNoDataError = error && error.message && error.message.includes("404");

  // Show error message
  if (error && !isNoDataError) {
    return <div>Error: {error.message}</div>;
  }

  const addButtonDisabled =
    createHabitMutation.isPending ||
    isLoadingHabits ||
    alreadyTracking ||
    !suggestedHabit ||
    showAddSuccess;

  // Main recommendations view
  return (
    <CardStackContainer>
      <ContentArea>
        {recommendations.length > 0 ? (
          <>
            {/* Left edge hover zone */}
            <EdgeHoverZone
              $side="left"
              onClick={handlePrevious}
              style={{ opacity: currentIndex === 0 ? 0 : undefined }}
            >
              <EdgeArrow $side="left">
                <FontAwesomeIcon icon={faChevronLeft} />
              </EdgeArrow>
            </EdgeHoverZone>

            {/* Right edge hover zone */}
            <EdgeHoverZone
              $side="right"
              onClick={handleNext}
              style={{
                opacity:
                  currentIndex === recommendations.length - 1 ? 0 : undefined,
              }}
            >
              <EdgeArrow $side="right">
                <FontAwesomeIcon icon={faChevronRight} />
              </EdgeArrow>
            </EdgeHoverZone>

            {/* Content with slide animation */}
            <SlideContainer $animationDirection={animationDirection}>
              <ImprovementLabel>Improve</ImprovementLabel>
              <CategoryHeader>
                {recommendations[currentIndex]?.category}
              </CategoryHeader>
              <RecommendationText>
                {recommendations[currentIndex]?.feedback}
              </RecommendationText>
              {suggestedHabit ? (
                <SuggestedHabitFooter>
                  <SuggestedHabitHeading>
                    Suggested{" "}
                    <SuggestedHabitHeadingAccent>Habit</SuggestedHabitHeadingAccent>
                  </SuggestedHabitHeading>
                  <SuggestedHabitDivider />
                  <SuggestedHabitActionsSlot>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={suggestedHabitFooterKey}
                        initial={
                          reduceMotion
                            ? false
                            : { opacity: 0, y: 14 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -10 }
                        }
                        transition={{
                          ...habitFooterTransition,
                          exit: habitFooterExitTransition,
                        }}
                        style={{ width: "100%" }}
                      >
                        {showAddSuccess ? (
                          <>
                            <HabitAddedNote role="status">
                              Added “{suggestedHabit.name}” to your habit
                              tracker.
                            </HabitAddedNote>
                            <motion.div
                              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={
                                reduceMotion
                                  ? { duration: 0 }
                                  : { delay: 0.08, duration: 0.35, ease: habitFooterEase }
                              }
                            >
                              <ViewHabitTrackerButton
                                type="button"
                                onClick={() => navigate(RoutePaths.HABITS)}
                              >
                                Go to habit tracker
                              </ViewHabitTrackerButton>
                            </motion.div>
                          </>
                        ) : alreadyTracking ? (
                          <AlreadyTrackingNote>
                            This habit is already in your tracker.
                          </AlreadyTrackingNote>
                        ) : (
                          <>
                            <motion.div
                              layout={!reduceMotion}
                              transition={
                                reduceMotion
                                  ? { duration: 0 }
                                  : { duration: 0.3, ease: habitFooterEase }
                              }
                            >
                              <SuggestedHabitAddButton
                                type="button"
                                disabled={addButtonDisabled}
                                onClick={handleAddSuggestedHabit}
                                aria-busy={createHabitMutation.isPending}
                              >
                                {createHabitMutation.isPending
                                  ? "Adding…"
                                  : isLoadingHabits
                                    ? "Loading…"
                                    : `Add “${suggestedHabit.name}” to habit tracker`}
                              </SuggestedHabitAddButton>
                            </motion.div>
                            {habitAddError ? (
                              <HabitActionError role="alert">
                                {habitAddError}
                              </HabitActionError>
                            ) : null}
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </SuggestedHabitActionsSlot>
                </SuggestedHabitFooter>
              ) : null}
            </SlideContainer>

            {/* Keyboard hint */}
            <KeyboardHint>Use ← → keys to navigate</KeyboardHint>
          </>
        ) : (
          <NoRecommendations>
            <div className="icon">
              <FontAwesomeIcon icon={faLightbulb} />
            </div>
            <div className="message">No recommendations available</div>
          </NoRecommendations>
        )}
      </ContentArea>
    </CardStackContainer>
  );
}
