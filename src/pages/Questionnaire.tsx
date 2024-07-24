import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import round from "lodash/round";
import questionData from "../common/questionnaire.json";
import styled from "styled-components";
import { getFullPath } from "../common/Routes";
import { PageBackground } from "../components/styled/PageBackground";
import { DashboardContainer } from "../components/styled/DashboardContainer";
import { DashboardCardContainer } from "../components/styled/DashboardCardContainer";
import { QuestionnaireCard } from "../components/styled/QuestionnaireCard";
import { Ques } from "../components/Ques";
import { RoutePaths } from "../common/Routes";
import { StartQuestionnaire } from "./StartQuestionnaire";
import { RetakeQuestionnaire } from "./RetakeQuestionnaire";
import { NavigationButton } from "../components/styled/NavigationButton";

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

const SubmitButton = styled(NavigationButton).attrs({ as: "a" })`
  display: inline-block;
  text-align: center;
  text-decoration: none;
`;

// types

export enum Type {
  RADIO = "radio",
  CHECKBOX = "checkbox",
  RANGE = "range",
}

interface Option {
  optionId: number;
  optionLabel: string;
  points: number;
}

export interface Question {
  id: number;
  title: string;
  type: Type;
  options: Option[];
}

type Responses = Record<number, number | number[]>;

// Helper function to calculate the score for each option
const calculateOptionScore = (
  points: number,
  numberOfOptions: number,
  maxPointsPerQuestion: number
) => {
  return (points / numberOfOptions) * maxPointsPerQuestion;
};

// Helper function to find the option and calculate its score
const findOptionScore = (
  optionId: number,
  question: Question,
  maxPointsPerQuestion: number
) => {
  const option = question.options.find((opt) => opt.optionId === optionId);
  if (option) {
    return calculateOptionScore(
      option.points,
      question.options.length,
      maxPointsPerQuestion
    );
  }
  return 0;
};

// Function to calculate the total score when the user submits the questionnaire
const calculateTotalScore = (questions: Question[], responses: Responses) => {
  const numberOfQuestions = questions.length;
  const maxPointsPerQuestion = 100 / numberOfQuestions;
  let totalScore = 0;

  questions.forEach((question) => {
    const response = responses[question.id];
    let questionScore = 0;

    if (response !== undefined) {
      // Check if the response is an array (checkbox input) before calculating the score
      if (Array.isArray(response)) {
        response.forEach((ele) => {
          questionScore += findOptionScore(ele, question, maxPointsPerQuestion);
        });
      } else {
        questionScore += findOptionScore(
          response,
          question,
          maxPointsPerQuestion
        );
      }
    }

    // Ensure the score for this question does not exceed the max points per question
    totalScore += Math.min(questionScore, maxPointsPerQuestion);
  });

  // Ensure the total score does not exceed 100
  totalScore = Math.min(totalScore, 100);

  // Round the total score to the nearest integer
  totalScore = round(totalScore, 0);

  return totalScore;
};

export function Questionnaire() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const storedResponses = localStorage.getItem("questionnaire");

  // State to keep track of the current question number
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  // State to store the user's responses
  const [responses, setResponses] = useState<Responses>(
    storedResponses ? JSON.parse(storedResponses) : {}
  );

  // Map the questions from the JSON data to the Question type
  const questions: Question[] = questionData.questions.map((question) => ({
    ...question,
    type: question.type as Type,
  }));

  // Updates local storage for current question
  useEffect(() => {
    const savedCurrentQuestion = localStorage.getItem("currentQuestion");
    if (questionId) {
      setCurrentQuestion(parseInt(questionId));
    } else if (savedCurrentQuestion) {
      setCurrentQuestion(parseInt(savedCurrentQuestion));
    } else {
      setCurrentQuestion(0);
    }
  }, [questionId]);

  // Effect to save the current question number to local storage whenever it changes
  useEffect(() => {
    if (currentQuestion > 0) {
      localStorage.setItem("currentQuestion", currentQuestion.toString());
    }
  }, [currentQuestion]);

  // Handle the change in response for a question
  const handleResponseChange = (
    questionId: number,
    response: number | number[]
  ) => {
    const updatedResponses = { ...responses, [questionId]: response };
    localStorage.setItem("questionnaire", JSON.stringify(updatedResponses));
    setResponses(updatedResponses);
  };

  // Navigate to the next question
  const handleNext = () => {
    if (currentQuestion < questions.length) {
      navigate(
        `${getFullPath(RoutePaths.QUESTIONNAIRE)}/${currentQuestion + 1}`
      );
    }
  };

  // Navigate to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      navigate(
        `${getFullPath(RoutePaths.QUESTIONNAIRE)}/${currentQuestion - 1}`
      );
    }
  };

  // Handle the submission of the questionnaire
  const handleSubmit = () => {
    const totalScore = calculateTotalScore(questions, responses);
    localStorage.setItem("questionnaire", JSON.stringify(responses));
    localStorage.setItem("totalScore", JSON.stringify(totalScore));
    localStorage.removeItem("currentQuestion");
    console.log("Submit questionnaire", responses);
    console.log("Total Score", totalScore);
  };

  // Determine if the "Next" button should be disabled
  const currentQuestionType = questions[currentQuestion - 1]?.type;
  const isNextDisabled =
    currentQuestionType !== Type.RANGE &&
    (responses[currentQuestion] === undefined ||
      responses[currentQuestion] === null);

  // Reset responses when retaking the questionnaire
  const resetResponses = () => {
    setResponses({});
    setCurrentQuestion(1);
  };

  // Render the start-questionnaire page if the current question is 0
  if (currentQuestion === 0) {
    if (storedResponses) {
      return <RetakeQuestionnaire resetResponses={resetResponses} />;
    }
    return <StartQuestionnaire />;
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
                      index < currentQuestion ? "filled" : ""
                    }`}
                  ></div>
                ))}
              </ProgressBar>
              <ProgressIndicator>
                Question {currentQuestion} / {questions.length}
              </ProgressIndicator>
              <Ques
                {...questions[currentQuestion - 1]}
                onResponseChange={handleResponseChange}
                initialResponse={responses[currentQuestion]}
              />
              <div>
                <NavigationButton
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                >
                  Previous
                </NavigationButton>
                {currentQuestion === questions.length ? (
                  <SubmitButton
                    href={getFullPath(RoutePaths.DASHBOARD)}
                    onClick={handleSubmit}
                  >
                    Submit
                  </SubmitButton>
                ) : (
                  <NavigationButton
                    onClick={handleNext}
                    disabled={isNextDisabled}
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
