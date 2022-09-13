import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./redux-slices/ui-slice";
import schedulesSlice from "./redux-slices/schedules-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    schedules: schedulesSlice,
  },
});

export const { dispatch, getState } = store;

export default store;
