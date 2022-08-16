import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule(state, { payload }) {
      state.push(payload.item);
    },
    editSchedule(state, { payload }) {},
    removeSchedule(state, { payload }) {},
  },
});

export const { addSchedule, editSchedule, removeSchedule } =
  schedulesSlice.actions;

export default schedulesSlice.reducer;
