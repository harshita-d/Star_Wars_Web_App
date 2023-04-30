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
import StarshipDetails from "../starshipDetails/StarshipDetails";
import { FirestoreAPISetup } from "../../api/FirestoreAPISetup";
import { fireStore } from "../../auth/AuthConfig";

function ExtraMovieData() {
  const dispatch = useDispatch();
  const [onMouseOver, setonMouseOver] = useState(false);
  const [StoreFavData, setStoreFavData] = useState({
    nameVal: null,
    typeVal: null,
  });
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

        const charactersDataArray = res.map((character) => character.data);

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
      case 4:
        return <StarshipDetails starshipsData={item} />;
      default:
        break;
    }
  };

  const favoriteSelectedHandler = (movieName, item) => {
    const payload = { movie: movieName };
    /*     try {
      const res = axios.post(
        "https://starwarsapp-4a647-default-rtdb.firebaseio.com/favoritesSelected.json",
        payload
      );
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    } */
    var type = "";
    if (sideBarStatusValue === 2) {
      type = "characters";
    } else if (sideBarStatusValue === 3) {
      type = "planets";
    } else if (sideBarStatusValue === 4) {
      type = "star ships";
    }
    setStoreFavData({ nameVal: movieName, typeVal: type });
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
          <div id="accordianOuterDivID" className={styles.accordianOuterDiv}>
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
                  </div>
                  {movieExtraData !== null && mainComponentData(item)}
                  <div
                    className={styles.favIconTextButton}
                    onClick={() => favoriteSelectedHandler(item.name, item)}
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
        {StoreFavData.nameVal !== null && (
          <FirestoreAPISetup
            name={StoreFavData.nameVal}
            type={StoreFavData.typeVal}
          />
        )}
      </div>
    </>
  );
}

export default ExtraMovieData;
