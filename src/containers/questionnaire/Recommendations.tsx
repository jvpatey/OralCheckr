import { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import questionData from "../../common/questionnaire.json";
import { colors } from "../../common/color-utils";

// Styled-components for Recommendations Component
const NoRecommendations = styled.div`
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${colors.textGrey};
`;

const CarouselContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const CarouselContent = styled.div`
  flex-grow: 1;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.textGrey};
  padding: 20px 40px;
  overflow-y: auto;

  @media (max-width: 950px) {
    font-size: 12px;
    padding: 15px 30px;
  }

  @media (max-width: 375px) {
    padding: 10px 20px;
  }
`;

const CategoryText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: ${colors.green};

  @media (max-width: 950px) {
    font-size: 14px;
  }
`;

const StyledHeader = styled(Card.Header)`
  background-color: ${colors.bgWhite};
  color: ${colors.blue};
  font-size: 25px;
  font-weight: bold;
  border: none;
  text-align: center;
  margin-top: 50px;

  @media (max-width: 950px) {
    margin-top: 10px;
    font-size: 18px;
  }
`;

const CustomCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
  position: relative;

  .carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 5px;
  }

  .carousel-indicators li {
    background-color: ${colors.disabledBgGrey};
  }

  .carousel-indicators .active {
    background-color: ${colors.green};
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    color: ${colors.green};
    margin: 0 -15px;
  }

  .carousel-control-prev {
    left: 10;
  }

  .carousel-control-next {
    right: 0;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 20px;
    height: 20px;
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

// Functional component for the Recommendations card
export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [index, setIndex] = useState(0);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    const storedResponses = JSON.parse(
      localStorage.getItem("questionnaire") || "{}"
    );
    const recs: Recommendation[] = [];

    questionData.questions.forEach((question) => {
      const response = storedResponses[question.id];

      if (Array.isArray(response)) {
        response.forEach((res) => {
          const recommendation = processOption(res, question);
          addRecommendation(recs, recommendation);
        });
      } else if (response !== undefined) {
        const recommendation = processOption(response, question);
        addRecommendation(recs, recommendation);
      }
    });

    setRecommendations(recs);
    hasFetchedRef.current = true;
  }, []);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

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
