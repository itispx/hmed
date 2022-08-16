import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSchedule: (() => new Date().getDay())(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectSchedule(state, { payload }) {
      state.selectedSchedule = payload.index;
    },
  },
});

export const { selectSchedule } = uiSlice.actions;

export default uiSlice.reducer;
