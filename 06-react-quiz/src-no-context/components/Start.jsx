function Start({ numQustions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQustions} quistions to test your react mastery</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type:'start'})}>let's start</button>
    </div>
  );
}

export default Start;
