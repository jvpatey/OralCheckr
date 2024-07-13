import { useEffect, useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import questionData from "../common/questionnaire.json";

const StyledCard = styled(Card)`
  background-color: #f5f5f5;
  border: transparent;
  border-radius: 20px;
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
`;

const NoRecommendations = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    console.log("Fetching recommendations...");

    const storedResponses = JSON.parse(
      localStorage.getItem("questionnaire") || "{}"
    );
    const recs: string[] = [];

    questionData.questions.forEach((question) => {
      const response = storedResponses[question.id];

      if (Array.isArray(response)) {
        // Handle checkbox responses
        response.forEach((res) => {
          const option = question.options.find((opt) => opt.optionId === res);
          if (option && option.Feedback) {
            recs.push(option.Feedback);
          }
        });
      } else {
        // Handle other responses
        const option = question.options.find(
          (opt) => opt.optionId === response
        );
        if (option && option.Feedback) {
          recs.push(option.Feedback);
        }
      }
    });

    console.log("Recommendations fetched: ", recs);
    setRecommendations(recs);
    hasFetchedRef.current = true;
  }, []);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <StyledCard>
      <Card.Header>Recommendations</Card.Header>
      <Card.Body>
        {recommendations.length > 0 ? (
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {recommendations.map((feedback, idx) => (
              <Carousel.Item key={idx}>
                <div
                  className="d-block w-100"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    marginBottom: "30px",
                  }}
                >
                  {feedback}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <NoRecommendations>No recommendations available</NoRecommendations>
        )}
      </Card.Body>
    </StyledCard>
  );
}
