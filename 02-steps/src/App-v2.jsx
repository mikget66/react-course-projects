import React from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
// state is basically data that a component can hold over time 
// holds information the component needs to remember throughout its lifecycle 
// when we update a state react rerenders that component
function App() {

  const [step, Setstep] = React.useState(1);
  const  [isOpen, setIsOpen] = React.useState(true);
  //useState is a react hook and we can call it only
  //in the top level of component

  //do not update state maniually 
  //❌ step = step + 1
  function handlePrevious(){
    if(step > 1) Setstep((current)=> current -1)
  }
  function handleNext(){
    if(step < 3) Setstep((current)=> current +1)

  }

  return (
    <>
      <button 
        className="close"
        onClick={()=>setIsOpen((isOpen)=> !isOpen)}
      >
        &times;
      </button>
   {isOpen && <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? 'active' : ""}>1</div>
        <div className={step >= 2 ? 'active' : ""}>2</div>
        <div className={step >= 3 ? 'active' : ""}>3</div>
      </div>
      <StepMesage
        step ={step}
      >
        {messages[step - 1]}
      </StepMesage>
      
      <div className="buttons">
      <Button
          textColor="#fff"
          bgColor='#7950f2'
          onClick={handlePrevious}
        >
          <span>👈</span>Previous
        </Button>
       
      <Button
          textColor="#fff"
          bgColor='#7950f2'
          onClick={handleNext}
        >
          Next<span>👉</span>
        </Button>
       
      </div>
    </div>}
          </>
  );
}
function StepMesage ({step, children}){
  return(

    <div className="message">
        <h3>Step {step}</h3>
        {children}
      </div>
      )
}
function Button ({textColor, bgColor, onClick, children}){
  return(
    <button
      style ={{backgroundColor: bgColor, color:textColor}}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default App;
