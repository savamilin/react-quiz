import React from "react";

export default function Question({ question, dispatch, answer }) {
  const hasCorrect = answer !== null;
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasCorrect
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => dispatch({ type: "nextQuestion", payload: index })}
            key={index}
            disabled={hasCorrect}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
