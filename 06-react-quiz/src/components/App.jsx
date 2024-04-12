import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Quistion from "./Quistion";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finshed from "./Finshed";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuestions } from "../contexts/QuestionProvider";

function App() {
  const { status } = useQuestions();

  return (
    
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <Start />}
          {status === "active" && (
            <>
              <Progress />
              <Quistion />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}
          {status === "finish" && <Finshed />}
        </Main>
      </div>
    
  );
}

export default App;
