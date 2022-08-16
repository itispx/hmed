import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialized: false,
  schedules: [],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule(state, { payload }) {
      state.schedules.push(payload.item);
    },
    editSchedule(state, { payload }) {},
    removeSchedule(state, { payload }) {},
  },
});

export const { addSchedule, editSchedule, removeSchedule } =
  schedulesSlice.actions;

export default schedulesSlice.reducer;
