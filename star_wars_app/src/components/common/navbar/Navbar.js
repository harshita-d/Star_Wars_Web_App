import Logo from "../../../assets/SWLogo2.png";
import styles from "./Navbar.module.css";
import HomeIcon from "../../../assets/SWHomeLogo.png";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/AuthConfig";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/reducer/AuthReducer";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(authActions.loggingStatus(null));
        sessionStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log("error", error);
      });
  };
  return (
    <div className={styles.navbarOuterDiv}>
      <div>
        <Link to="/">
          <img src={Logo} alt="swlogo" style={{ height: "100%" }} />
        </Link>
      </div>
      <div className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </div>
      {/* <img src={HomeIcon} alt="HomeIcon" style={{ height: "40%" }} /> */}
    </div>
  );
}

export default Navbar;

//fontspace
