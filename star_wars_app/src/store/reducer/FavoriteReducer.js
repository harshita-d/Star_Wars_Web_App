import { createSlice } from "@reduxjs/toolkit";

const initialState = { favourites: null };

const favoriteReducer = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favouritesData(state, action) {
      state.favourites = action.payload;
    },
  },
});

export const favAction = favoriteReducer.actions;

export default favoriteReducer;
