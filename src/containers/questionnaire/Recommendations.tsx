import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Card } from "react-bootstrap";
import { useGetQuestionnaireResponse } from "../../hooks/questionnaire/useGetQuestionnaireResponse";
import type { Recommendation } from "../../common/types/questionnaire/recommendations.types";
import { generateRecommendations } from "./utils/recommendations-utils";
import { StyledHeader } from "../../components/questionnaire/styles/SharedQuestionnaireStyles";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import {
  NoRecommendations,
  CarouselContainer,
  CarouselContent,
  CategoryText,
  CustomCarousel,
} from "./styles/RecommendationsStyles";

// Recommendations component with carousel display
export function Recommendations() {
  const {
    data: questionnaireData,
    isLoading,
    error,
  } = useGetQuestionnaireResponse();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [index, setIndex] = useState(0);

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

  // Handle carousel navigation
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

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
    <>
      <StyledHeader>Recommendations</StyledHeader>
      <Card.Body
        style={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {recommendations.length > 0 ? (
          <CarouselContainer>
            <CustomCarousel activeIndex={index} onSelect={handleSelect}>
              {recommendations.map((rec, idx) => (
                <Carousel.Item
                  key={idx}
                  style={{ marginBottom: "10px", height: "100%" }}
                >
                  <CarouselContent>
                    <CategoryText>{rec.category}</CategoryText>
                    {rec.feedback}
                  </CarouselContent>
                </Carousel.Item>
              ))}
            </CustomCarousel>
          </CarouselContainer>
        ) : (
          <NoRecommendations>No recommendations available</NoRecommendations>
        )}
      </Card.Body>
    </>
  );
}
