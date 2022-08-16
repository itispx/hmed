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
    return { success: { item: {} } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function getScheduleHandler(id) {
  try {
    return { success: { item: {} } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function getAllSchedulesHandler() {
  try {
    return { success: { items: [] } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function getScheduleFromDayHandler(day) {
  try {
    return { success: { items: [] } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

async function editScheduleHandler(id) {
  try {
    return { success: { item: {} } };
  } catch ({ message }) {
    toastsActions.showError(null, message);

    return { error: { message } };
  }
}

async function deleteScheduleHandler(id) {
  try {
    return { success: { deleted: false } };
  } catch ({ message }) {
    toastsActions.showError(null, message);
    return { error: { message } };
  }
}

export default schedulesActions;
