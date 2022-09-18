import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./redux-slices/ui-slice";
import schedulesSlice from "./redux-slices/schedules-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice,
    schedules: schedulesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;

export const getState = () => store.getState();

export default store;
