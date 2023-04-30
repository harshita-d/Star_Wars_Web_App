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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const navbarStyle = {
    backgroundColor: scrollPosition > 0 ? "#000" : "transparent",
    transition: "background-color 0.5s ease-in-out",
  };

  const handleClickFavorite = () => {
    navigate("/favorites");
  };

  return (
    <div className={styles.navbarOuterDiv} style={navbarStyle}>
      <div>
        <Link to="/">
          <img src={Logo} alt="swlogo" style={{ height: "100%" }} />
        </Link>
      </div>
      <div className={styles.logoutButton}>
        <span>
          <img src={home} alt="home" />
          Home
        </span>
        <span onClick={handleClickFavorite}>
          <img src={FavIcon} alt="FavIcon" />
          Favorites
        </span>
        <span onClick={handleLogout}>
          <img src={logoutIcon} alt="logoutIcon" style={{ width: "25%" }} />
          Logout
        </span>
      </div>
    </div>
  );
}

export default Navbar;

//fontspace
