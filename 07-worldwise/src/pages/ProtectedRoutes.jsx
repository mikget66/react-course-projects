import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuhContext";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(! isAuthenticated) navigate('/')
  },[isAuthenticated, navigate])


  return children;
}

export default ProtectedRoutes;