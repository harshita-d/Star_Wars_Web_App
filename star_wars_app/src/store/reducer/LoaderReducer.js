import { createSlice } from "@reduxjs/toolkit";

const initialState = { progressCount: 0 };

const loaderReducer = createSlice({
  name: "loaderChange",
  initialState,
  reducers: {
    loaderCountIncrease(state) {
      state.progressCount = state.progressCount + 1;
    },
    loaderCountDecrease(state) {
      state.progressCount = state.progressCount - 1;
    },
  },
});

export const loaderChangeAction = loaderReducer.actions;

export default loaderReducer;
