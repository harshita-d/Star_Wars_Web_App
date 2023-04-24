import style from "./MovieOverview.module.css";
import slideShowTwo from "../../assets/homeImgae1.jpg";
import slideShowOne from "../../assets/slideShow5.jpg";
import slideShowThree from "../../assets/slideShow7.jpg";
import slideShowFour from "../../assets/darthvedarWallpaper.jpg";
import slideShowFive from "../../assets/clones2.jpg";
import slideShowSix from "../../assets/slideShow6.jpg";
import slideShowSeven from "../../assets/slideShow4.jpg";
import slideShowEight from "../../assets/slideShow3.jpg";
import { useState, useRef, useEffect, memo } from "react";
import MovieDetails from "../movieDetails/MovieDetails";

function MovieOverview() {
  const images = [
    slideShowOne,
    slideShowTwo,
    slideShowThree,
    slideShowFour,
    slideShowFive,
    slideShowSix,
    slideShowSeven,
    slideShowEight,
  ];

  const [index, setIndex] = useState(0);
  const [ShowMovieDetails, setShowMovieDetails] = useState(false);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      2500
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const handleMovieDetails = () => {
    setShowMovieDetails(true);
  };

  return (
    <div className={style.slideshow}>
      {/* <img src={HomeImage} alt="HomeImage" style={{ width: "100%" }} />
      <span className={style.episodeOne}>
        <img src={episodeOne} alt="episodeOne" style={{ width: "100%" }} />
        <div className={style.moreText}>More</div>
      </span>
      <img src={episodeTwo} alt="episodeTwo" style={{ width: "100%" }} />
      <img src={episodeThree} alt="episodeThree" style={{ width: "100%" }} />
      <img src={episodeFour} alt="episodeFour" style={{ width: "100%" }} />
      <img src={episodeFive} alt="episodeFive" style={{ width: "100%" }} />
      <img src={episodeSix} alt="episodeSix" style={{ width: "100%" }} /> */}
      <div style={{ margin: "0% 10% " }}>
        <div
          className={style.slideshowSlider}
          style={{ transform: `translate3d(${-index * 60}rem, 0, 0)` }}
        >
          {images.map((imgVal, index) => (
            <div
              className={style.slide}
              key={index}
              //style={{ backgroundColor }}
              onClick={handleMovieDetails}
            >
              <img src={imgVal} alt="images" className={style.slideShowImage} />
            </div>
          ))}
        </div>

        <div className={style.slideshowDots}>
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`${style.slideshowDot} ${
                index === idx
                  ? `${style.slideshowDotActive}`
                  : `${style.slideshowDotDeActive}`
              }`}
              onClick={() => {
                setIndex(idx);
              }}
            />
          ))}
        </div>
      </div>
      <MovieDetails />
    </div>
  );
}

export default memo(MovieOverview);
