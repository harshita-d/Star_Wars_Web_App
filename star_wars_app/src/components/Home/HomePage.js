import styles from "./HomePage.module.css";
import SideBar from "../sideBar/SideBar";
import AuthPage from "../common/AutharizationPage/AuthPage";

function HomePage() {
  const loggedInStatus = sessionStorage.getItem("token");

  return (
    <div className={styles.homeOuterDiv}>
      <div className={styles.homeInnerDiv}>
        {!loggedInStatus ? <AuthPage /> : <SideBar />}
      </div>
    </div>
  );
}

export default HomePage;
