function NextButton({ dispatch, answer, NumQuestions, i}) {
  if (answer === null) return null;
  if(i <NumQuestions-1)return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
  if(i === NumQuestions-1)return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finish" })}
    >
      Finish
    </button>
  );
}

export default NextButton;
