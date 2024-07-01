import { useState } from "react";
import { Ques } from "../components/Ques";
import { QuesProps, Type } from "../common/Types";
import questionData from "../common/questionnaire.json";
import styled from "styled-components";
import { Card } from "react-bootstrap";

// styled-component styles for Questionnaire Page

const PageBackground = styled.div`
  height: 100vh;
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
`;

const StyledCard = styled(Card)`
  width: 97vw;
  height: 87vh;
  min-width: 300px;
  min-height: 300px;
  background-color: #e0e0e0;
  border: transparent;
  border-radius: 20px;
  margin-top: 68px;
  animation: fadeInUp 1s ease-out;

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
`;

const QuesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 0;
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

  &:hover {
    background-color: #066a83;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
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
                <NavigationButton
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                </NavigationButton>
              </div>
            </QuesContainer>
          </StyledCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}
