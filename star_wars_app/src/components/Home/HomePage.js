import styles from "./HomePage.module.css";
import SideBar from "../sideBar/SideBar";
import AuthPage from "../common/AutharizationPage/AuthPage";
import { useSelector } from "react-redux";

function HomePage() {
  const userData = useSelector((state) => state.authReducer.authData);

  return (
    <div className={styles.homeOuterDiv}>
      <div className={styles.homeInnerDiv}>
        {userData === null ? <AuthPage /> : <SideBar />}
      </div>
    </div>
  );
}

export default HomePage;
