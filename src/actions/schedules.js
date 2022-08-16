import store from "../redux-store";

const schedulesActions = (() => {
  const hasBeenInitialized = store.getState().schedules.initialized;

  console.log("hasBeenInitialized:", hasBeenInitialized);

  if (!hasBeenInitialized) {
    // Initialize store
    console.log("STORE NOT INIT");
  }

  return {
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

async function getScheduleHandler(id) {}

async function getAllSchedulesHandler() {}

async function getScheduleFromDayHandler(day) {}

async function editScheduleHandler(id) {}

async function deleteScheduleHandler(id) {}

export default schedulesActions;
