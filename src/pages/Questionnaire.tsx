import { useState } from "react";
import { Ques } from "../components/Ques";
import { QuesProps, Type } from "../common/Types";
import questionData from "../common/questionnaire.json";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutePaths } from "../common/Routes";

// styled-component styles for Questionnaire Page

const PageBackground = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    max-width: 100vw;
  }
`;

const DashboardCardContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;

  @media (max-width: 1100px) {
    margin-left: 0;
    padding: 10px;
  }

  @media (max-height: 700px) {
    padding: 10px;
  }
`;

const StyledCard = styled(Card)`
  width: 80vw;
  max-width: 1400px;
  height: 80vh;
  min-height: 60vh;
  background-color: #e0e0e0;
  border: transparent;
  border-radius: 20px;
  margin-top: 68px;
  animation: fadeInUp 1s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @media (max-height: 700px) {
    height: auto;
    margin-top: 20px;
  }

  @media (max-width: 1100px) {
    width: 90vw;
    height: 70vh;
  }

  @media (max-height: 500px) {
    height: auto;
    min-height: 50vh;
  }
`;

const QuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
`;

const ProgressBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .progress-segment {
    width: 100%;
    height: 8px;
    background-color: #ccc;
    border-radius: 4px;
    margin-right: 4px;

    &.filled {
      background-color: #07889b;
    }
  }
`;

const ProgressIndicator = styled.div`
  font-size: 1.15rem;
  color: #07889b;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const NavigationButton = styled.button`
  background-color: #07889b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;
  width: 150px;

  &:hover {
    background-color: #066a83;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    width: 100px;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled(NavigationButton).attrs({ as: Link })`
  display: inline-block;
  text-align: center;
  text-decoration: none;
`;

export function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions: QuesProps[] = questionData.questions.map((question) => ({
    ...question,
    type: Type[question.type.toUpperCase() as keyof typeof Type],
  }));

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submit questionnaire");
  };

  return (
    <PageBackground>
      <DashboardContainer>
        <DashboardCardContainer>
          <StyledCard>
            <QuesContainer>
              <ProgressBar>
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`progress-segment ${
                      index <= currentQuestion ? "filled" : ""
                    }`}
                  ></div>
                ))}
              </ProgressBar>
              <ProgressIndicator>
                Question {currentQuestion + 1} / {questions.length}
              </ProgressIndicator>
              <Ques
                id={questions[currentQuestion].id}
                title={questions[currentQuestion].title}
                type={questions[currentQuestion].type}
                options={questions[currentQuestion].options}
              />
              <div>
                <NavigationButton
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </NavigationButton>
                {currentQuestion === questions.length - 1 ? (
                  <SubmitButton
                    to={RoutePaths.DASHBOARD}
                    onClick={handleSubmit}
                  >
                    Submit
                  </SubmitButton>
                ) : (
                  <NavigationButton
                    onClick={handleNext}
                    disabled={currentQuestion === questions.length - 1}
                  >
                    Next
                  </NavigationButton>
                )}
              </div>
            </QuesContainer>
          </StyledCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}
