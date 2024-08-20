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
`;

const CarouselContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CarouselContent = styled.div`
  flex: 1;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.textGrey};
  padding: 10px 40px;
  overflow-y: auto;

  @media (max-width: 950px) {
    font-size: 12px;
    padding: 10px 25px;
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
    font-size: 18px;
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
    margin-bottom: 20px;
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
  }

  .carousel-control-prev {
    left: 15px;
  }

  .carousel-control-next {
    right: 15px;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 30px;
    height: 30px;
  }

  .carousel-indicators .active,
  .carousel-indicators {
    filter: invert(1);
  }

  @media (max-width: 950px) {
    .carousel-control-prev,
    .carousel-control-next {
      top: 50%;
      width: 20px;
      height: 20px;
    }

    .carousel-control-prev {
      left: 10px;
    }

    .carousel-control-next {
      right: 10px;
    }

    .carousel-indicators {
      bottom: -10px;
    }

    .carousel-indicators li {
      width: 8px;
      height: 8px;
    }
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
        style={{ padding: 0, display: "flex", flexDirection: "column" }}
      >
        {recommendations.length > 0 ? (
          <CarouselContainer>
            <CustomCarousel activeIndex={index} onSelect={handleSelect}>
              {recommendations.map((rec, idx) => (
                <Carousel.Item key={idx} style={{ marginBottom: "10px" }}>
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
