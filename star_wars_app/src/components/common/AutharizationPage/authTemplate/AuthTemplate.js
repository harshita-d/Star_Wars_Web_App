import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./AuthTemplate.module.css";
import crossIcon from "../../../../assets/closeIconWhite.png";
import SignIn from "../signin/SignIn";
import { useEffect, useState } from "react";
import Login from "../login/Login";

function AuthTemplate() {
  const [searchParams] = useSearchParams();
  const loggedInStatus = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const handleCloseButton = () => {
    navigate("/");
  };
  const [signinPageShow, setsigninPageShow] = useState(false);

  useEffect(() => {
    searchParams.get("mode") === "signin"
      ? setsigninPageShow(true)
      : setsigninPageShow(false);
  }, [searchParams.get("mode")]);

  return (
    <div className={styles.signinContainer}>
      <img src={crossIcon} alt="crossIcon" onClick={handleCloseButton} />
      {!loggedInStatus ? (
        <div className={styles.signInnerDiv}>
          {signinPageShow ? <SignIn /> : <Login />}
        </div>
      ) : (
        <h>You Are Already Logged In!</h>
      )}
    </div>
  );
}

export default AuthTemplate;
