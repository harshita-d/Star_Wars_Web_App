import authReducer from "./reducer/AuthReducer";
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducer/MovieReducer";
import loaderReducer from "./reducer/LoaderReducer";
import favoriteReducer from "./reducer/FavoriteReducer";

const store = configureStore({
  reducer: {
    authReducer: authReducer.reducer,
    movieReducer: movieReducer.reducer,
    loaderReducer: loaderReducer.reducer,
    favoriteReducer: favoriteReducer.reducer,
  },
  devTools: true,
});

export default store;
