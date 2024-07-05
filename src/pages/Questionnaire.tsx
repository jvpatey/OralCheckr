import { useState } from "react";
import { Ques } from "../components/Ques";
import questionData from "../common/questionnaire.json";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RoutePaths } from "../common/Routes";
import { getFullPath } from "../common/Routes";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { QuestionnaireCard } from "../components/styled/QuestionnaireCard";

// styled-component styles for Questionnaire Page

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

// types

enum Type {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  RANGE = "range",
  DROPDOWN = "dropdown",
}

interface Option {
  optionId: number;
  optionLabel: string;
}

interface QuesProps {
  id: number;
  title: string;
  type: Type;
  options: Option[];
}

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
          <QuestionnaireCard>
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
                    to={getFullPath(RoutePaths.DASHBOARD)}
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
          </QuestionnaireCard>
        </DashboardCardContainer>
      </DashboardContainer>
    </PageBackground>
  );
}
