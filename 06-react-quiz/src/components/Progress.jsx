import { useQuestions } from "../contexts/QuestionProvider";

function Progress() {
  const { index, NumQuestions, points, totalPoints, answer }= useQuestions();
  return (
    <header className="progress">
      <progress max={NumQuestions} value={index + Number(answer !== null) } />
      <p>
        Question <strong>{index + 1}</strong> /{NumQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> /{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
