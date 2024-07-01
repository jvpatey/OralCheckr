import { useState } from "react";
import { Ques } from "../components/Ques";
import { QuesProps, Type } from "../common/Types";
import questionData from "../common/questionnaire.json";

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
    <div>
      <div className="progress-bar">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`progress-segment ${
              index <= currentQuestion ? "filled" : ""
            }`}
          ></div>
        ))}
      </div>
      <Ques
        id={questions[currentQuestion].id}
        title={questions[currentQuestion].title}
        type={questions[currentQuestion].type}
        options={questions[currentQuestion].options}
      />
      <button onClick={handlePrevious} disabled={currentQuestion === 0}>
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={currentQuestion === questions.length - 1}
      >
        Next
      </button>
    </div>
  );
}
