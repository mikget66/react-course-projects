function Progress({ i, NumQuestions, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress max={NumQuestions} value={i + Number(answer !== null) } />
      <p>
        Question <strong>{i + 1}</strong> /{NumQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> /{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
