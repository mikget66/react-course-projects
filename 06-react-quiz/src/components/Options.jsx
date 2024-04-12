import { useQuestions } from "../contexts/QuestionProvider";

function Options({ question }) {
  const {  answer, dispatch } = useQuestions();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option 
            ${index === answer ? "answer" : ""} 
            ${hasAnswer ?index === question.correctOption ? "correct" : "wrong": ""}`}
          disabled={hasAnswer}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
