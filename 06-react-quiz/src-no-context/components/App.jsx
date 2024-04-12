import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import Start from "./Start";
import Quistion from "./Quistion";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finshed from "./Finshed";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUS = 30

const initialState = {
  question: [],
  status: "loading", // 'loading' - 'ready' - 'active' - 'error' - 'finshed'
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        question: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondeRemaining: state.question.length * SECS_PER_QUS,
      };
    case "newAnswer":
      const question = state.question.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        question: state.question,
        status: "ready",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondeRemaining: state.secondeRemaining - 1,
        status: state.secondeRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { question, status, index, answer, points, highScore, secondeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQustions = question.length;
  const totalPoints = question.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numQustions={numQustions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              i={index}
              NumQuestions={numQustions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Quistion
              question={question[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondeRemaining={secondeRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                NumQuestions={numQustions}
                i={index}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finshed
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
