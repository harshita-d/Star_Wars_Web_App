import EpOneText from "../../assets/epOneText.png";
import epOne from "../../assets/episodeOne.jpg";
import epTwo from "../../assets/episodeTwo.jpg";
import EPTwoText from "../../assets/EpTwoText.png";
import style from "./MovieDetails.module.css";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useState } from "react";

function MovieDetails() {
  const [movieId, setmovieId] = useState(null);
  const data = [
    { text: "epOneText.png", images: "episodeOne.jpg", id: 4 },
    { text: "EpTwoText.png", images: "episodeTwo.jpg", id: 5 },
    { text: "epThreeText.png", images: "episodeThree.jpg", id: 6 },
    { text: "epFourText.png", images: "episodeFour.jpg", id: 1 },
    { text: "epFiveText.png", images: "episodeFive.jpg", id: 2 },
    { text: "epSixText.png", images: "episodeSix.jpg", id: 3 },
  ];

  const handleClickMovie = (id) => {
    setmovieId(id);
  };
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div key={item.id}>
            <Link
              to={`/movieDetail`}
              //search: "?name=azheraleem",
              //onClick={e=>handleClickMovie(item.id)}
              className={style.detailsOuterDiv}
              state={{ id: `${item.id}` }}
            >
              <div
                style={{
                  display: "flex",
                  order: `${index % 2 === 0 ? "" : "2"}`,
                  margin: "0% 5%",
                }}
                className={style.detailsTextDiv}
              >
                <div className={style.detailsInfoDiv}>
                  <img
                    src={require(`../../assets/${item.text}`)}
                    alt={`${item.text}`}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className={style.detailBtn}>Explore...</div>
              </div>
              <div className={style.detailsImageDiv}>
                <img
                  src={require(`../../assets/${item.images}`)}
                  alt={`${item.images}`}
                />
              </div>
            </Link>
            ;
          </div>
        );
      })}
    </div>
  );
}

export default memo(MovieDetails);
