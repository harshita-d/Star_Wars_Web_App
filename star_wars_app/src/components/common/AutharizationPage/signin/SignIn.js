import styles from "./SignIn.module.css";
import { useState } from "react";
import crossIcon from "../../../../assets/closeIconWhite.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/AuthConfig";
import { authActions } from "../../../../store/reducer/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import InputTextbox from "../../InputTextbox/InputTextbox";
import Login from "../login/Login";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInDetails, setsignInDetails] = useState({
    name: "",
    email: "",
    password: null,
  });
  const [signInError, setsignInError] = useState({
    code: null,
    message: "",
  });

  const handleSubmitSignin = () => {
    createUserWithEmailAndPassword(
      auth,
      signInDetails.email,
      signInDetails.password
    )
      .then((res) => {
        const user = res.user;
        dispatch(authActions.loggingStatus(user));
        sessionStorage.setItem(
          "token",
          user?.authData?.stsTokenManager?.accessToken
        );
        navigate("/");
      })
      .catch((error) => {
        setsignInError((prev) => ({
          ...prev,
          message: error.message,
          code: error.code,
        }));
      });
  };

  const handleUserDataChange = (userData) => {
    setsignInDetails((prev) => ({
      ...prev,
      ...userData,
    }));
  };
  return (
    <>
      <div className={styles.siginPageOuterDiv}>
        <span className={styles.signinHeadingDiv}>SIGNIN</span>
        <div className={styles.signinInputDiv}>
          <span>Name</span>
          <InputTextbox
            type="text"
            placeholder="Enter Name"
            onChange={(value) => handleUserDataChange({ name: value })}
          />
        </div>
        <div className={styles.signinInputDiv}>
          <span>Email</span>
          <InputTextbox
            type="email"
            placeholder="Enter Email"
            onChange={(value) => handleUserDataChange({ email: value })}
          />
        </div>
        <div className={styles.signinInputDiv}>
          <span>Password</span>
          <InputTextbox
            type="password"
            placeholder="Enter Password"
            onChange={(value) => handleUserDataChange({ password: value })}
          />
        </div>
        <div className={styles.signinErrorMsg}>
          {signInError.code} {signInError.message}
        </div>
        <button className={styles.signinButton} onClick={handleSubmitSignin}>
          SIGNIN
        </button>
        <p>
          Already have an account?
          <Link to={`?mode=login`}>Login</Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
