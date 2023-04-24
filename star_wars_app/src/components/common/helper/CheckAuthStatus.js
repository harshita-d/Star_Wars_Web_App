import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

function CheckAuthStatus() {
  const loggedInStatus = sessionStorage.getItem("token");
  if (!loggedInStatus) {
    return redirect("/auth");
  }
  return null;
}

export default CheckAuthStatus;
