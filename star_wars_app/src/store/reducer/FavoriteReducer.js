import { createSlice } from "@reduxjs/toolkit";

const initialState = { favorites: null };

const favoriteReducer = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoritesData(state, action) {
      state.favorites = action.payload;
    },
  },
});

export const favAction = favoriteReducer.actions;

export default favoriteReducer;
