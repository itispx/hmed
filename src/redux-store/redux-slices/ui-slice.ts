import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UISliceState {
  selectedSchedule: number;
}

const initialState: UISliceState = {
  selectedSchedule: (() => new Date().getDay())(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    selectSchedule(state, action: PayloadAction<{ index: number }>) {
      state.selectedSchedule = action.payload.index;
    },
  },
});

export const { selectSchedule } = uiSlice.actions;

export default uiSlice.reducer;
