import { getState } from "../redux-store";

import {
  updateInitializeStateQuery,
  addScheduleStateQuery,
  removeScheduleStateQuery,
} from "../queries/local-state/schedulesQueries";

import {
  initiateStorageQuery,
  getSchedulesStorageQuery,
  addScheduleStorageQuery,
  removeScheduleStorageQuery,
} from "../queries/local-storage/schedulesQueries";

import {
  addScheduleNotificationAction,
  removeScheduleNotificationAction,
} from "./notificationsActions";

import { showError, showSuccess } from "./toastsActions";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export async function addScheduleAction(
  time: string,
  name: string,
  quantity: number,
  days: number[],
) {
  try {
    const id = uuidv4();

    const item = { id, time, name, quantity, days };

    // Schedule notification
    const schedule = await addScheduleNotificationAction(item);

    // Add to local storage
    await addScheduleStorageQuery(schedule);

    // Add to local state
    const { payload } = addScheduleStateQuery(schedule);

    // Show success message
    showSuccess("Alerta adicionado");
    return { item: payload };
  } catch ({ message }) {
    showError("Falha ao adicionar");
    return { error: { message: "Failed to add schedule" } };
  }
}

export async function removeScheduleAction(id: string, notificationIDs: string[]) {
  try {
    // Delete notifications
    for (let i = 0; i < notificationIDs.length; i++) {
      await removeScheduleNotificationAction(notificationIDs[i]);
    }

    // Delete in local storage
    await removeScheduleStorageQuery(id);

    // Delete in local state
    removeScheduleStateQuery(id);

    // Show success message
    showSuccess("Alerta removido");
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
        await initiateStorageQuery();

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
