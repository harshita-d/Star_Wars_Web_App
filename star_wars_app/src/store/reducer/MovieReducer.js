import { createSlice } from "@reduxjs/toolkit";

const initialState = { movie: null, sideBarStatus: 1, extraData: null };
const movieReducer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    movieData(state, action) {
      state.movie = action.payload;
    },
    charactersDataChange(state, action) {
      state.extraData = action.payload;
    },
    sideBarChange(state, action) {
      state.sideBarStatus = action.payload;
    },
  },
});

export const movieAction = movieReducer.actions;

export default movieReducer;
