import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Card } from "react-bootstrap";
import { useGetQuestionnaireResponse } from "../../hooks/questionnaire/useGetQuestionnaireResponse";
import type { Recommendation } from "../../common/types/questionnaire/recommendations.types";
import { generateRecommendations } from "./utils/recommendations-utils";
import { StyledHeader } from "../../components/questionnaire/styles/SharedQuestionnaireStyles";
import {
  NoRecommendations,
  CarouselContainer,
  CarouselContent,
  CategoryText,
  CustomCarousel,
} from "./styles/RecommendationsStyles";

// Functional component for the Recommendations card
export function Recommendations() {
  const {
    data: storedResponses,
    isLoading,
    error,
  } = useGetQuestionnaireResponse();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [index, setIndex] = useState(0);

  // When responses change, process them to generate recommendations
  useEffect(() => {
    if (!storedResponses || !storedResponses.responses) return;

    // Convert string responses to number format
    const convertedResponses: Record<number, number | number[]> = {};

    Object.entries(storedResponses.responses).forEach(([key, value]) => {
      const questionId = parseInt(key);
      try {
        // Try to parse as JSON in case it's an array
        const parsed = JSON.parse(value);
        convertedResponses[questionId] = parsed;
      } catch (e) {
        // If not JSON, convert to number
        convertedResponses[questionId] = parseInt(value);
      }
    });

    const recs = generateRecommendations(convertedResponses);
    setRecommendations(recs);
  }, [storedResponses]);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  if (isLoading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
