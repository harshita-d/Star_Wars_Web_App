import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./ExtraMovieData.module.css";
import { movieAction } from "../../../../store/reducer/MovieReducer";
import { loaderChangeAction } from "../../../../store/reducer/LoaderReducer";
import CharacterDetails from "../charactersDetails/CharacterDetails";
import PlanetsDetails from "../planetsDetails/PlanetsDetails";
import favoriteWheatIcon from "../../../../assets/FavWheatLineIcon.png";
import favWhiteLineIcon from "../../../../assets/FavWheatFilledIcon.png";

function ExtraMovieData() {
  const dispatch = useDispatch();
  const [onMouseOver, setonMouseOver] = useState(false);
  const movieApiData = useSelector((state) => state.movieReducer.movie);
  const movieExtraData = useSelector((state) => state.movieReducer.extraData);
  const sideBarStatusValue = useSelector(
    (state) => state.movieReducer.sideBarStatus
  );

  useEffect(() => {
    dispatch(loaderChangeAction.loaderCountIncrease());
    let apiDataCall = null;
    switch (sideBarStatusValue) {
      case 2:
        apiDataCall = movieApiData.characters;
        break;
      case 3:
        apiDataCall = movieApiData.planets;
        break;
      case 4:
        apiDataCall = movieApiData.starships;
        break;
      case 5:
        apiDataCall = movieApiData.vehicles;
        break;
      case 6:
        apiDataCall = movieApiData.species;
        break;
      default:
        break;
    }

    (async () => {
      try {
        const res = await Promise.all(
          apiDataCall.map((apiCall) => axios.get(apiCall))
        );

        const charactersDataArray = await res.map(
          (character) => character.data
        );

        dispatch(movieAction.charactersDataChange(charactersDataArray));
        dispatch(loaderChangeAction.loaderCountDecrease());
      } catch (error) {
        console.log("error", error);
        dispatch(loaderChangeAction.loaderCountDecrease());
      }

      try {
        const res = axios.get(
          "https://starwarsapp-4a647-default-rtdb.firebaseio.com/favoritesSelected.json"
        );
        console.log("res-get", res);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [sideBarStatusValue]);

  const mainComponentData = (item) => {
    switch (sideBarStatusValue) {
      case 2:
        return <CharacterDetails charactersData={item} />;
      case 3:
        return <PlanetsDetails planets={item} />;
      default:
        break;
    }
  };

  const favoriteSelectedHandler = async (movieName) => {
    const payload = { movie: movieName };
    try {
      const res = axios.post(
        "https://starwarsapp-4a647-default-rtdb.firebaseio.com/favoritesSelected.json",
        payload
      );
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangeHeight = (value) => {
    setonMouseOver(value);
  };

  useEffect(() => {
    const element = document.getElementById("accordianOuterDivID");
    if (movieExtraData !== null && !onMouseOver) {
      element.style.height = `${movieExtraData?.length * 4}rem`;
    }
    if (movieExtraData !== null && onMouseOver && movieExtraData?.length < 5) {
      element.style.height = "65rem";
    }
  }, [onMouseOver, movieExtraData]);

  return (
    <>
      <div className={styles.movieDataInnerDiv}>
        <div className={styles.accordianWrapperDiv}>
          {console.log("movieExtraData", movieExtraData)}
          <div
            id="accordianOuterDivID"
            className={styles.accordianOuterDiv}
            /*  style={{
              height: `${
                movieExtraData !== null
                  ? onMouseOver && movieExtraData?.length < 4
                    ? movieExtraData?.length * 10
                    : movieExtraData?.length * 4
                  : 0
              }rem`,
            }} */
          >
            {movieExtraData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.accordianInnerDiv}
                  onMouseOver={(e) => handleChangeHeight(true)}
                  onMouseOut={(e) => handleChangeHeight(false)}
                >
                  <div>
                    <div>{item.name}</div>
                    {/*  <div
                      className={styles.favIconButton}
                      onClick={() => favoriteSelectedHandler(item.name)}
                    >
                      <img
                        src={favoriteWheatIcon}
                        alt="favoriteIcon"
                        style={{ width: "50%" }}
                      />
                    </div> */}
                  </div>
                  {movieExtraData !== null && mainComponentData(item)}
                  <div
                    className={styles.favIconTextButton}
                    onClick={() => favoriteSelectedHandler(item.name)}
                  >
                    <span className={styles.addFavButton}>
                      <img
                        src={favWhiteLineIcon}
                        alt="favoriteIcon"
                        style={{ width: "15%" }}
                      />{" "}
                      ADD TO FAVORITE
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExtraMovieData;
