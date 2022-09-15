import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ScheduleInterface from "../../interfaces/schedule-interface";

interface SchedulesSliceState {
  initialized: boolean;
  schedules: ScheduleInterface[];
}

const initialState: SchedulesSliceState = {
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
    updateInitialize(state, action: PayloadAction<{ value: boolean }>) {
      state.initialized = action.payload.value;
    },
    addSchedule(state, action: PayloadAction<{ item: ScheduleInterface }>) {
      // TODO Proper order based on time
      state.schedules.unshift(action.payload.item);
    },
    removeSchedule(state, action: PayloadAction<{ id: string }>) {
      state.schedules = state.schedules.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { updateInitialize, addSchedule, removeSchedule } =
  schedulesSlice.actions;

export default schedulesSlice.reducer;
