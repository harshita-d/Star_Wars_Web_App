import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader/Loader";

function LoaderProvider({ children }) {
  const loaderCount = useSelector((state) => state.loaderReducer.progressCount);
  return (
    <>
      {loaderCount !== 0 && <Loader />}
      {children}
    </>
  );
}

export default LoaderProvider;
