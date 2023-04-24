import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div className={styles.loginOuterDiv}>
        <Link to="/movie" className={styles.LinkText}>
          <div className={styles.loginFirstDiv}>HOME</div>
        </Link>
        <div className={styles.loginFirstDiv}>ABOUT</div>
        <div className={styles.loginFirstDiv}>CONTACT</div>
      </div>
    </>
  );
}

export default SideBar;
