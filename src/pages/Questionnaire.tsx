import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import questionData from "../common/questionnaire.json";
import styled from "styled-components";
import { getFullPath } from "../common/Routes";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { QuestionnaireCard } from "../components/styled/QuestionnaireCard";
import { Ques } from "../components/Ques";
import { RoutePaths } from "../common/Routes";

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

const SubmitButton = styled(NavigationButton).attrs({ as: "a" })`
  display: inline-block;
  text-align: center;
  text-decoration: none;
`;

const TitleText = styled.h1`
  color: #07889b;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const CardText = styled.h5`
  color: #222831;
  margin-bottom: 20px;
  margin-right: 40px;
  margin-left: 40px;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const StartButton = styled(NavigationButton)`
  width: 25%;
  text-align: center;

  @media (max-width: 768px) {
    width: 40%;
  }

  &:hover {
    background-color: #f5f5f5;
    color: #07889b;
    font-weight: bold;
    border: solid;
    border-color: #07889b;
  }
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
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(
    questionId ? parseInt(questionId) - 1 : -1
  );

  const questions: QuesProps[] = questionData.questions.map((question) => ({
    ...question,
    type: Type[question.type.toUpperCase() as keyof typeof Type],
  }));

  useEffect(() => {
    if (questionId) {
      setCurrentQuestion(parseInt(questionId) - 1);
    } else {
      setCurrentQuestion(-1);
    }
  }, [questionId]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      navigate(
        `${getFullPath(RoutePaths.QUESTIONNAIRE)}/${currentQuestion + 2}`
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      navigate(`${getFullPath(RoutePaths.QUESTIONNAIRE)}/${currentQuestion}`);
    }
  };

  const handleSubmit = () => {
    console.log("Submit questionnaire");
  };

  if (currentQuestion === -1) {
    // Render the start-questionnaire page
    return (
      <PageBackground>
        <DashboardContainer>
          <DashboardCardContainer>
            <QuestionnaireCard>
              <TitleText>Oral Health Questionnaire</TitleText>
              <CardText>
                Take our oral health questionnaire to evaluate your dental
                well-being.
              </CardText>
              <CardText>
                Receive a personalized score and tailored recommendations based
                on your answers to gain valuable insights and improve your oral
                health.
              </CardText>
              <CardText>
                Utilize our recommendations and track your progress using our
                integrated habit tracker.
              </CardText>
              <StartButton
                as={Link}
                to={`${getFullPath(RoutePaths.QUESTIONNAIRE)}/1`}
              >
                Begin
              </StartButton>
            </QuestionnaireCard>
          </DashboardCardContainer>
        </DashboardContainer>
      </PageBackground>
    );
  }

  // Render the questionnaire pages
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
                    href={getFullPath(RoutePaths.DASHBOARD)}
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
