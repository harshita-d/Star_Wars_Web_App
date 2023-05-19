import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function CheckAuthStatus({ children }) {
  const userData = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();

  if (userData === null) {
    navigate.push("/auth");
  }

  return children;
}

export default CheckAuthStatus;
