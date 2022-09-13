import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialized: false,
  schedules: [],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    updateInitialize(state, { payload }) {
      state.initialized = payload.value;
    },
    addSchedule(state, { payload }) {
      state.schedules.push(payload.item);
    },
    removeSchedule(state, { payload }) {
      state.schedules = state.schedules.filter(
        (item) => item.id !== payload.id
      );
    },
  },
});

export const { updateInitialize, addSchedule, removeSchedule } =
  schedulesSlice.actions;

export default schedulesSlice.reducer;
