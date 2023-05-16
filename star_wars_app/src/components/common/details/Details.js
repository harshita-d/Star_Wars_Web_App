import { useEffect, memo, useState } from "react";
import { useLocation } from "react-router";
import axiosHelper from "../helper/axiosHelper";
import styles from "./Details.module.css";
import { urlConfig } from "../../../config/URLConfig";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../../../store/reducer/MovieReducer";
import { useNavigate } from "react-router-dom";
import { loaderChangeAction } from "../../../store/reducer/LoaderReducer";
import MovieDataSidebar from "./movieSidebar/movieDataSidebar";
import DataTemplate from "./dataTemplate/DataTemplate";
import ExtraMovieData from "./extraMovieData/ExtraMovieData";

function Details() {
  let { state } = useLocation();
  const data = [
    { images: "ep1.jpg", id: 4 },
    { images: "ep2.jpg", id: 5 },
    { images: "ep3.jpg", id: 6 },
    { images: "ep4.jpeg", id: 1 },
    { images: "ep5.jpg", id: 2 },
    { images: "ep6.jpg", id: 3 },
  ];

  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movieReducer);
  const [movieImage, setmovieImage] = useState({ images: "", id: null });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loaderChangeAction.loaderCountIncrease());
    dispatch(movieAction.sideBarChange(1));
    (async () => {
      try {
        const response = await axiosHelper.get(
          `/${urlConfig.films}/${state.id}`
        );
        dispatch(movieAction.movieData(response.data));
        const img = data.filter((item) => item.id === Number(state.id));
        setmovieImage(img[0]);
        dispatch(loaderChangeAction.loaderCountDecrease());
      } catch (err) {
        console.log("MovieDataAPI", err);
        dispatch(loaderChangeAction.loaderCountDecrease());
      }
    })();
  }, [state.id]);

  return (
    <>
      {movieImage.images !== "" && (
        <div className={styles.detailsOuterDiv}>
          <div className={styles.detailsImageDiv}>
            <img
              src={require(`../../../assets/${movieImage.images}`)}
              alt="movie-img"
              style={{ width: "100%" }}
            />
          </div>
          <div className={styles.detailsInnerDiv}>
            <div className={styles.movieDataOuterDiv}>
              <MovieDataSidebar />
              {movieData.sideBarStatus === 1 && <DataTemplate />}
              {movieData.sideBarStatus !== 1 && <ExtraMovieData />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Details);
