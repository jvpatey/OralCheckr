import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { DashboardTile } from "./styled/DashboardTile";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import questionData from "../common/questionnaire.json";

// styled-component styles for Recommendations Component

const NoRecommendations = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  height: 50%;
`;

const CarouselContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CarouselContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #e0e0e0;
  padding: 20px;
  margin: 0 50px;
`;

const CategoryText = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  color: #222831;
`;

const StyledHeader = styled(Card.Header)`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  color: #07889b;
  border: transparent;
  background-color: transparent;
  border-radius: 20px 20px 0 0;
  padding: 10px;
  margin-top: 20px;
`;

// Custom styles for carousel controls and indicators
const CustomCarousel = styled(Carousel)`
  .carousel-indicators li {
    background-color: #e0e0e0;
  }

  .carousel-indicators .active {
    background-color: #07889b;
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: auto;
    color: #e0e0e0;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon,
  .carousel-indicators .active,
  .carousel-indicators {
    filter: invert(1);
  }
`;

interface Recommendation {
  category: string;
  feedback: string;
}

// Helper function to process a single option and add it to recommendations
const processOption = (
  optionId: number,
  question: (typeof questionData.questions)[0],
  recs: Recommendation[]
) => {
  const option = question.options.find((opt) => opt.optionId === optionId);
  if (option && option.feedback) {
    recs.push({
      category: question.Category,
      feedback: option.feedback,
    });
  }
};

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
          processOption(res, question, recs);
        });
      } else {
        // Handle other responses
        processOption(response, question, recs);
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
    <DashboardTile>
      <StyledHeader>Feedback and Recommendations</StyledHeader>
      <Card.Body style={{ padding: 0 }}>
        {recommendations.length > 0 ? (
          <CarouselContainer>
            <CustomCarousel activeIndex={index} onSelect={handleSelect}>
              {recommendations.map((rec, idx) => (
                <Carousel.Item key={idx} style={{ marginBottom: "30px" }}>
                  <CarouselContent style={{ color: "#222831" }}>
                    <CategoryText style={{ color: "#07889b" }}>
                      {rec.category}
                    </CategoryText>
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
    </DashboardTile>
  );
}
