import { getState } from "../redux-store";

import {
  updateInitializeStateQuery,
  addScheduleStateQuery,
  removeScheduleStateQuery,
} from "../queries/local-state/schedulesQueries";

import {
  initiateStorageQuery,
  addScheduleStorageQuery,
  getSchedulesStorageQuery,
} from "../queries/local-storage/schedulesQueries";

import { showError } from "./toastsActions";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const schedulesActions = (() => {
  return {
    addSchedule,
    removeSchedule,
  };
})();

export async function addSchedule(
  time: string,
  name: string,
  quantity: number,
  days: number[]
) {
  try {
    const id = uuidv4();

    const item = { id, time, name, quantity, days };

    // Add to local storage
    await addScheduleStorageQuery(item);

    // Add to local state
    const { payload } = addScheduleStateQuery(item);

    // Schedule notification
    return { item: payload };
  } catch ({ message }) {
    showError("Falha ao adicionar");
    return { error: { message: "Failed to add schedule" } };
  }
}

export async function removeSchedule(id: string) {
  try {
    // Delete in local storage

    // Delete in local state
    const { payload } = removeScheduleStateQuery(id);

    // Delete notification
    return { deleted: true };
  } catch ({ message }) {
    showError("Falha ao remover");
    return { error: { message: "Failed to remove schedule" } };
  }
}

export async function initializeStateAction(): Promise<void> {
  try {
    const hasBeenInitialized = getState().schedules.initialized;

    // Get data from local-storage
    if (!hasBeenInitialized) {
      // Initialize store
      const { data, error } = await getSchedulesStorageQuery();

      if (error) {
        initiateStorageQuery();

        updateInitializeStateQuery(true);
      }

      if (data) {
        for (let i = 0; i < data.length; i++) {
          addScheduleStateQuery(data[i]);
        }

        updateInitializeStateQuery(true);
      }
    }
  } catch ({ message }) {
    showError("Algo deu errado");
  }
}

export default schedulesActions;
