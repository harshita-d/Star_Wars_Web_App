import Logo from "../../../assets/SWLogo2.png";
import styles from "./Navbar.module.css";
import HomeIcon from "../../../assets/SWHomeLogo.png";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/AuthConfig";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/reducer/AuthReducer";
import { useNavigate } from "react-router-dom";
import FavIcon from "../../../assets/FavIcon.png";
import { useEffect, useState } from "react";
import home from "../../../assets/homeIcon.png";
import logoutIcon from "../../../assets/logout.png";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [onHomeHover, setonHomeHover] = useState({ id: 0, val: null });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(authActions.loggingStatus(null));
        sessionStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleClickFavorite = () => {
    navigate("/favourites");
  };

  const handleClickHome = () => {
    navigate("/movie");
  };
  return (
    <div className={styles.navbarOuterDiv}>
      <div>
        <Link to="/">
          <img src={Logo} alt="swlogo" style={{ height: "100%" }} />
        </Link>
      </div>
      <div className={styles.logoutButton}>
        <span
          onClick={handleClickHome}
          onMouseOver={(e) => setonHomeHover({ id: 1, val: "Home" })}
          onMouseOut={(e) => setonHomeHover({ id: 0, val: "" })}
        >
          <div>
            <img src={home} alt="Home" className={styles.homeIcon} />
          </div>
          <div className={styles.homeText}>
            {onHomeHover.id === 1 && <>{onHomeHover.val}</>}
          </div>
        </span>
        <span
          onClick={handleClickFavorite}
          onMouseOver={(e) => setonHomeHover({ id: 2, val: "favourites" })}
          onMouseOut={(e) => setonHomeHover({ id: 0, val: "" })}
        >
          <img src={FavIcon} alt="FavIcon" />
          {onHomeHover.id === 2 && <>{onHomeHover.val}</>}
        </span>
        <span
          onClick={handleLogout}
          onMouseOver={(e) => setonHomeHover({ id: 3, val: "Logout" })}
          onMouseOut={(e) => setonHomeHover({ id: 0, val: "" })}
        >
          <img src={logoutIcon} alt="logoutIcon" />
          {onHomeHover.id === 3 && <>{onHomeHover.val}</>}
        </span>
      </div>
    </div>
  );
}

export default Navbar;

//fontspace
