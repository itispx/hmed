import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ScheduleInterface from "../../interfaces/schedule-interface";

interface SchedulesSliceState {
  initialized: boolean;
  schedules: ScheduleInterface[];
}

const initialState: SchedulesSliceState = {
  initialized: false,
  schedules: [],
};

const schedulesSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    updateInitialize(state, action: PayloadAction<{ value: boolean }>) {
      state.initialized = action.payload.value;
    },
    addSchedule(state, action: PayloadAction<{ item: ScheduleInterface }>) {
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
