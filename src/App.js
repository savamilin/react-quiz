import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import Starter from "./Starter";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import Results from "./Results";
import Footer from "./Footer";
import Timer from "./Timer";

const inicaialState = {
  question: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  timer: null,
};

function recuder(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "enterData":
      return { ...state, question: action.payload, status: "ready" };
    case "active":
      return { ...state, status: "active", timer: state.question.length * 30 };
    case "error":
      return { ...state, status: "error" };
    case "nextQuestion":
      const question = state.question[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NextAnswer":
      return {
        ...state,
        index: state.index++,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finish",
      };
    case "restart":
      return {
        ...inicaialState,
        question: state.question,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        status: state.timer === 0 ? (state.status = "finish") : state.status,
        timer: state.timer - 1,
      };
  }
}

function App() {
  const [{ question, status, index, answer, points, timer }, dispatch] =
    useReducer(recuder, inicaialState);

  // diraved state
  const numOfQestion = question.length;
  const maxPossiblePoints = question.reduce((prv, cur) => prv + cur.points, 0);
  //
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((rest) => rest.json())
      .then((data) => dispatch({ type: "enterData", payload: data }))
      .catch((error) => dispatch({ type: "error" }));
  }, []);

  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Starter numOfQestion={numOfQestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              numOfQestion={question.length}
              index={index}
              answer={answer}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={question[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <NextButton
                answer={answer}
                dispatch={dispatch}
                numOfQestion={numOfQestion}
                index={index}
              />
              <Timer dispatch={dispatch} timer={timer} />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Results
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
