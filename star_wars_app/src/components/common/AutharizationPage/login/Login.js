import styles from "./Login.module.css";
import { useState } from "react";
import crossIcon from "../../../../assets/closeIconWhite.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/AuthConfig";
import { authActions } from "../../../../store/reducer/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import InputTextbox from "../../InputTextbox/InputTextbox";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logInDetails, setLogInDetails] = useState({
    email: "",
    password: null,
  });
  const [logInError, setLogInError] = useState({
    code: null,
    message: "",
  });

  const handleUserDataChange = (userData) => {
    setLogInDetails((prev) => ({
      ...prev,
      ...userData,
    }));
  };

  const handleSubmitLogin = () => {
    signInWithEmailAndPassword(auth, logInDetails.email, logInDetails.password)
      .then((userCredential) => {
        // Signed in
        console.log("userCredential", userCredential);
        const user = userCredential.user;

        sessionStorage.setItem("token", user.accessToken);
        dispatch(authActions.loggingStatus(user));

        navigate("/");
      })
      .catch((error) => {
        setLogInError((prev) => ({
          ...prev,
          code: error.code,
          message: error.message,
        }));
      });
  };

  return (
    <div className={styles.siginPageOuterDiv}>
      <span className={styles.signinHeadingDiv}>LOGIN</span>
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
        {logInError.code} {logInError.message}
      </div>
      <button className={styles.signinButton} onClick={handleSubmitLogin}>
        LOGIN
      </button>
      <p>
        Create an account?
        <Link to={`?mode=signin`}>Signin</Link>
      </p>
    </div>
  );
}

export default Login;
