import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionContext = createContext();

const SECS_PER_QUS = 30;

const initialState = {
  questions: [],
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
        questions: action.payload,
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
        secondeRemaining: state.questions.length * SECS_PER_QUS,
      };
    case "newAnswer":
      const questions = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === questions.correctOption
            ? state.points + questions.points
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
        questions: state.question,
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

function QuestionProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQustions = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondeRemaining,
        numQustions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionContext);
  if (context === undefined) {
    throw new Error("QuestionContext was used outside QuestionProvider");
  }
  return context;
}

export { QuestionProvider, useQuestions };
