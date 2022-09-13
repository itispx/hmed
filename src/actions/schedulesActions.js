import { getState } from "../redux-store";

import {
  updateInitializeStateQuery,
  addScheduleStateQuery,
  removeScheduleStateQuery,
} from "../queries/local-state/schedulesQueries";

import toastsActions from "./toastsActions";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const schedulesActions = (() => {
  const hasBeenInitialized = getState().schedules.initialized;

  console.log("hasBeenInitialized:", hasBeenInitialized);

  if (!hasBeenInitialized) {
    // Initialize store
    // Set store initialized to true
    // updateInitializeStateQuery(true);
  }

  return {
    addSchedule,
    removeSchedule,
  };
})();

async function addSchedule(time, name, quantity, days) {
  try {
    const id = uuidv4();

    const item = { id, time, name, quantity, days };

    // Add to local storage

    // Add to local state
    const { payload } = addScheduleStateQuery(item);

    // Schedule notification
    return { item: payload };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function removeSchedule(id) {
  try {
    // Delete in local storage

    // Delete in local state
    const { payload } = removeScheduleStateQuery(id);

    console.log("payload:", payload);

    // Delete notification
    return { deleted: true };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

export default schedulesActions;
