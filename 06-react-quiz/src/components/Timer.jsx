import { useEffect } from "react";
import { useQuestions } from "../contexts/QuestionProvider";

function Timer() {

  const { dispatch, secondeRemaining } = useQuestions();

  const mins = Math.floor(secondeRemaining / 60);
  const seconds = secondeRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  return <div className="timer">
    {mins <10 && 0}{mins}:{seconds <10 && 0}{seconds}
    </div>;
}

export default Timer;
