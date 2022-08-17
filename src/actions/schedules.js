import store from "../redux-store";

import toastsActions from "./toasts";

const schedulesActions = (() => {
  const hasBeenInitialized = store.getState().schedules.initialized;

  console.log("hasBeenInitialized:", hasBeenInitialized);

  if (!hasBeenInitialized) {
    // Initialize store
    console.log("STORE NOT INIT");
  }

  return {
    async addSchedule(item) {
      return await addScheduleHandler(item);
    },
    async getSchedule(id) {
      return await getScheduleHandler(id);
    },
    async getAllSchedules() {
      return await getAllSchedulesHandler();
    },
    async getScheduleFromDay(day) {
      return await getScheduleFromDayHandler(day);
    },
    async editSchedule(id, newSchedule) {
      return await editScheduleHandler(id, newSchedule);
    },
    async deleteSchedule(id) {
      return await deleteScheduleHandler(id);
    },
  };
})();

async function addScheduleHandler(item) {
  try {
    // Add to async-storage

    // Add to redux store

    // Schedule notification
    return { success: { item: {} } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function getScheduleHandler(id) {
  try {
    // Get from redux store

    return { success: { item: {} } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function getAllSchedulesHandler() {
  try {
    // Get from redux store

    return { success: { items: [] } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function getScheduleFromDayHandler(day) {
  try {
    // Get from redux store

    return { success: { items: [] } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function editScheduleHandler(id) {
  try {
    // Edit in async-storage

    // Edit in redux store

    // Edit notification

    return { success: { item: {} } };
  } catch ({ message }) {
    toastsActions.showError(null, message);

    return { error: { message } };
  }
}

async function deleteScheduleHandler(id) {
  try {
    // Delete in async-storage

    // Delete in redux store

    // Delete notification
    return { success: { deleted: false } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

export default schedulesActions;
