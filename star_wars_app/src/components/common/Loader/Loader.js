import React from "react";
import Styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={Styles.loaderDiv}>
      <div className={Styles.loading}></div>
    </div>
  );
}

export default Loader;
