import { useQuestions } from "../contexts/QuestionProvider";
import Options from "./Options";

function Quistion() {
  const { questions, index } = useQuestions();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Quistion;
