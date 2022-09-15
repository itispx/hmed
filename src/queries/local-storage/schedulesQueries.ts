import { getAsyncStorage, setAsyncStorage } from "./storage-common";

import ScheduleInterface from "../../interfaces/schedule-interface";

export async function getSchedulesStorageQuery(): Promise<{
  data?: ScheduleInterface[];
  error?: { message: string };
}> {
  try {
    const response = await getAsyncStorage("schedules");

    if (response) {
      return { data: response };
    }

    throw new Error("Failed to get schedules");
  } catch ({ message }) {
    return { error: { message: "Failed to get schedules" } };
  }
}

export async function addScheduleStorageQuery(
  item: ScheduleInterface
): Promise<void> {
  try {
    const result = await getSchedulesStorageQuery();

    if (result.data) {
      const newSchedulesArr = [...result.data, item];

      await setAsyncStorage(newSchedulesArr, "schedules");
    }
  } catch ({ message }) {
    if (typeof message === "string") {
      throw new Error(message);
    }
    throw new Error("Failed to add schedule to storage");
  }
}

export async function removeScheduleStorageQuery(id: string): Promise<void> {
  try {
    const result = await getSchedulesStorageQuery();

    if (result.data) {
      const newSchedulesArr = result.data.filter((i) => i.id !== id);

      await setAsyncStorage(newSchedulesArr, "schedules");
    }
  } catch ({ message }) {
    if (typeof message === "string") {
      throw new Error(message);
    }
    throw new Error("Failed to add schedule to storage");
  }
}

export async function initiateStorageQuery(): Promise<void> {
  try {
    await setAsyncStorage([], "schedules");
  } catch ({ message }) {
    if (typeof message === "string") {
      throw new Error(message);
    }
    throw new Error("Failed to add schedule to storage");
  }
}
