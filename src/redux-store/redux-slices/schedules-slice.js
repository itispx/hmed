import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialized: false,
  schedules: [
    {
      id: "a1b2c3",
      time: "10:00",
      name: "Tylenol",
      quantity: 65,
      days: [1, 2, 3],
    },
  ],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    updateInitialize(state, { payload }) {
      state.initialized = payload.value;
    },
    addSchedule(state, { payload }) {
      state.schedules.unshift(payload.item);
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
