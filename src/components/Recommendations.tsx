import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { DashboardTile } from "./styled/DashboardTile";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import questionData from "../common/questionnaire.json";
import { colors } from "../common/color-utils";

// styled-component styles for Recommendations Component

const NoRecommendations = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

const CarouselContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const CarouselContent = styled.div`
  flex: 1;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.textGrey};
  padding: 20px;
  margin: 0 50px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin: 0 20px;
    padding: 10px;
  }
`;

const CategoryText = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  color: ${colors.blue};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StyledHeader = styled(Card.Header)`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: ${colors.blue};
  border: transparent;
  background-color: transparent;
  border-radius: 20px 20px 0 0;
  padding: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// Custom styles for carousel controls and indicators
const CustomCarousel = styled(Carousel)`
  flex: 1;
  .carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .carousel-indicators li {
    background-color: ${colors.disabledBgGrey};
  }

  .carousel-indicators .active {
    background-color: ${colors.blue};
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    color: ${colors.disabledBgGrey};
  }

  .carousel-control-prev {
    left: 10px;
  }

  .carousel-control-next {
    right: 10px;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon,
  .carousel-indicators .active,
  .carousel-indicators {
    filter: invert(1);
  }

  @media (max-width: 768px) {
    .carousel-control-prev,
    .carousel-control-next {
      top: 45%;
    }
  }
`;

const FixedHeightDashboardTile = styled(DashboardTile)`
  @media (max-width: 768px) {
    height: 250px;
  }
`;

interface Recommendation {
  category: string;
  feedback: string;
}

// Helper function to process a single option and return a recommendation
const processOption = (
  optionId: number,
  question: (typeof questionData.questions)[0]
): Recommendation | null => {
  const option = question.options.find((opt) => opt.optionId === optionId);
  if (option && option.feedback) {
    return {
      category: question.Category,
      feedback: option.feedback,
    };
  }
  return null;
};

// Helper function to add recommendation to recs array
const addRecommendation = (
  recs: Recommendation[],
  recommendation: Recommendation | null
) => {
  if (recommendation) {
    recs.push(recommendation);
  }
};

// Functional component for the Recommendations card on the Dashboard
export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [index, setIndex] = useState(0);
  const hasFetchedRef = useRef(false);

  // useEffect hook to fetch recommendations
  useEffect(() => {
    if (hasFetchedRef.current) return;

    const storedResponses = JSON.parse(
      localStorage.getItem("questionnaire") || "{}"
    );
    const recs: Recommendation[] = [];

    questionData.questions.forEach((question) => {
      const response = storedResponses[question.id];

      if (Array.isArray(response)) {
        // Handle checkbox responses
        response.forEach((res) => {
          const recommendation = processOption(res, question);
          addRecommendation(recs, recommendation);
        });
      } else {
        // Handle other responses
        const recommendation = processOption(response, question);
        addRecommendation(recs, recommendation);
      }
    });

    // Update state with fetched recommendations
    setRecommendations(recs);
    hasFetchedRef.current = true;
  }, []);

  // Handler for selecting a carousel slide
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <FixedHeightDashboardTile>
      <StyledHeader>Feedback and Recommendations</StyledHeader>
      <Card.Body
        style={{ padding: 0, display: "flex", flexDirection: "column" }}
      >
        {recommendations.length > 0 ? (
          <CarouselContainer>
            <CustomCarousel activeIndex={index} onSelect={handleSelect}>
              {recommendations.map((rec, idx) => (
                <Carousel.Item key={idx} style={{ marginBottom: "30px" }}>
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
    </FixedHeightDashboardTile>
  );
}
