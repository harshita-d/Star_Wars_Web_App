import React from "react";
import styles from "./authPage.module.css";
import { useNavigate } from "react-router-dom";
function AuthPage() {
  const navigate = useNavigate();
  const handleShowLogin = () => {
    navigate("/auth?mode=signin");
  };
  return (
    <div id="section05" className={`${styles.section05} ${styles.demo} `}>
      <div className={styles.homeSectionOne} onClick={handleShowLogin}>
        <span></span>SignIn
      </div>
    </div>
  );
}

export default AuthPage;
