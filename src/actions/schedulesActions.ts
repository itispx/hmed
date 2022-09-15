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

  // Get data from local-storage

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

async function addSchedule(
  time: string,
  name: string,
  quantity: number,
  days: number[]
) {
  try {
    const id = uuidv4();

    const item = { id, time, name, quantity, days };

    // Add to local storage

    // Add to local state
    const { payload } = addScheduleStateQuery(item);

    // Schedule notification
    return { item: payload };
  } catch ({ message }) {
    if (typeof message === "string") {
      toastsActions.showError(message);
      return { error: { message } };
    } else {
      toastsActions.showError("Falha ao adicionar");
      return { error: { message: "Failed to add schedule" } };
    }
  }
}

async function removeSchedule(id: string) {
  try {
    // Delete in local storage

    // Delete in local state
    const { payload } = removeScheduleStateQuery(id);

    // Delete notification
    return { deleted: true };
  } catch ({ message }) {
    if (typeof message === "string") {
      toastsActions.showError(message);
      return { error: { message } };
    } else {
      toastsActions.showError("Falha ao remover");
      return { error: { message: "Failed to remove schedule" } };
    }
  }
}

export default schedulesActions;
