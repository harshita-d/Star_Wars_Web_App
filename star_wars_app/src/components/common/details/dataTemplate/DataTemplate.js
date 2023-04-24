import React from "react";
import { useSelector } from "react-redux";
import styles from "./DataTemplate.module.css";

function DataTemplate() {
  const movieData = useSelector((state) => state.movieReducer);
  return (
    <div className={styles.movieDataInnerDiv}>
      <div>
        <span>Movie</span>
        <span className={styles.movieDataText}>
          {movieData.movie !== null && movieData.movie.title}
        </span>
      </div>
      <div>
        <span>Episode</span>
        <span className={styles.movieDataText}>
          {movieData.movie !== null && movieData.movie.episode_id}
        </span>
      </div>
      <div>
        <span>Producer</span>
        <span className={styles.movieDataText}>
          {movieData.movie !== null && movieData.movie.producer}
        </span>
      </div>
      <div>
        <span>Director</span>
        <span className={styles.movieDataText}>
          {movieData.movie !== null && movieData.movie.director}
        </span>
      </div>
      <div>
        <span>Released On</span>
        <span className={styles.movieDataText}>
          {movieData.movie !== null && movieData.movie.release_date}
        </span>
      </div>
      <div>
        <span>Opening Crawl</span>
        <span className={styles.movieDataText}>
          {movieData.movie !== null && movieData.movie.opening_crawl}
        </span>
      </div>
    </div>
  );
}

export default DataTemplate;
