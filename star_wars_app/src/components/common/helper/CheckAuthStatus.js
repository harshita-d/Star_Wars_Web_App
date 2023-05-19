import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthTemplate from "../AutharizationPage/authTemplate/AuthTemplate";

function CheckAuthStatus({ children }) {
  const userData = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null) {
      navigate("/auth");
    }
  }, [userData]);

  if (userData === null) {
    return null; // Render nothing until the navigation happens
  } else {
    return children;
  }
}

export default CheckAuthStatus;
