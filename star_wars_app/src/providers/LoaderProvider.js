import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/common/Loader/Loader";
import { firebase } from "../components/common/auth/AuthConfig";
import { authActions } from "../store/reducer/AuthReducer";

function LoaderProvider({ children }) {
  const loaderCount = useSelector((state) => state.loaderReducer.progressCount);
  const dispatch = useDispatch();
  const loggedInStatus = useSelector((state) => state.authReducer.isLoggedIn);
  if (!loggedInStatus) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authActions.loggingStatus(user));
      }
    });
  }
  return (
    <>
      {loaderCount !== 0 && <Loader />}
      {children}
    </>
  );
}

export default LoaderProvider;
