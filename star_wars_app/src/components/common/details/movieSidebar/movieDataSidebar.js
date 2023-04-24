import React from "react";
import styles from "./movieDataSidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../../../../store/reducer/MovieReducer";

function MovieDataSidebar(id) {
  const dispatch = useDispatch();
  const selectedSideBarValue = useSelector(
    (state) => state.movieReducer.sideBarStatus
  );
  const handleChangeTab = (tabId) => {
    console.log("tabId", tabId);
    dispatch(movieAction.sideBarChange(tabId));
  };

  return (
    <div className={styles.MovieSidebarOuterDiv}>
      <div
        className={`${selectedSideBarValue === 1 ? styles.selectedValue : ""}`}
        onClick={(e) => handleChangeTab(1)}
      >
        Movie
      </div>
      <div
        className={`${selectedSideBarValue === 2 ? styles.selectedValue : ""}`}
        onClick={(e) => handleChangeTab(2)}
      >
        Characters
      </div>
      <div
        className={`${selectedSideBarValue === 3 ? styles.selectedValue : ""}`}
        onClick={(e) => handleChangeTab(3)}
      >
        Planets
      </div>
      <div
        className={`${selectedSideBarValue === 4 ? styles.selectedValue : ""}`}
        onClick={(e) => handleChangeTab(4)}
      >
        Starships
      </div>
      <div
        className={`${selectedSideBarValue === 5 ? styles.selectedValue : ""}`}
        onClick={(e) => handleChangeTab(5)}
      >
        Vehicles
      </div>
      <div
        className={`${selectedSideBarValue === 6 ? styles.selectedValue : ""}`}
        onClick={(e) => handleChangeTab(6)}
      >
        Species
      </div>
    </div>
  );
}

export default MovieDataSidebar;
