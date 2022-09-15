import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UISliceState {
  selectedScheduleDay: number;
}

const initialState: UISliceState = {
  selectedScheduleDay: (() => new Date().getDay())(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectScheduleDay(state, action: PayloadAction<{ index: number }>) {
      state.selectedScheduleDay = action.payload.index;
    },
  },
});

export const { selectScheduleDay } = uiSlice.actions;

export default uiSlice.reducer;
