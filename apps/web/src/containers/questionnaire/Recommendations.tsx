import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { useGetQuestionnaireResponse } from "../../hooks/questionnaire/useGetQuestionnaireResponse";
import type { Recommendation } from "../../common/types/questionnaire/recommendations.types";
import { generateRecommendations } from "./utils/recommendations-utils";
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
} from "./styles/RecommendationsStyles";

// Recommendations component with card stack display
export function Recommendations() {
  const {
    data: questionnaireData,
    isLoading,
    error,
  } = useGetQuestionnaireResponse();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    "slideInLeft" | "slideInRight" | "slideOutLeft" | "slideOutRight" | "none"
  >("none");

  // Generate recommendations from questionnaire responses
  useEffect(() => {
    if (!questionnaireData || !questionnaireData.responses) return;

    const convertedResponses: Record<number, number | number[]> = {};

    Object.entries(questionnaireData.responses).forEach(([key, value]) => {
      const questionId = parseInt(key);
      try {
        const parsed = JSON.parse(value);
        convertedResponses[questionId] = parsed;
      } catch (e) {
        convertedResponses[questionId] = parseInt(value);
      }
    });

    const recs = generateRecommendations(convertedResponses);
    setRecommendations(recs);
  }, [questionnaireData]);

  // Handle navigation with animations
  const handleNext = () => {
    if (currentIndex < recommendations.length - 1) {
      setAnimationDirection("slideOutLeft");
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setAnimationDirection("slideInRight");
      }, 200);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setAnimationDirection("slideOutRight");
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setAnimationDirection("slideInLeft");
      }, 200);
    }
  };

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
  }, [currentIndex, recommendations.length]);

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
              <CategoryHeader>
                {recommendations[currentIndex]?.category}
              </CategoryHeader>
              <ImprovementLabel>IMPROVEMENT AREA</ImprovementLabel>
              <RecommendationText>
                {recommendations[currentIndex]?.feedback}
              </RecommendationText>
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
