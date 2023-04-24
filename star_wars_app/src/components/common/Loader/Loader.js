import React from "react";
import Styles from "./Loader.module.css";

function Loader() {
  console.log("==================");
  return <div class={Styles.loaderDiv}>Loading.....</div>;
}

export default Loader;
