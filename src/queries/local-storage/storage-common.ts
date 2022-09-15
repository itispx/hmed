import AsyncStorage from "@react-native-async-storage/async-storage";

import ScheduleInterface from "../../interfaces/schedule-interface";

export async function getAsyncStorage(
  key: string
): Promise<ScheduleInterface[]> {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue !== null ? JSON.parse(jsonValue) : null;
}

export async function setAsyncStorage(
  value: object,
  key: string
): Promise<void> {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
}

export async function mergeAsyncStorage(
  value: object,
  key: string
): Promise<void> {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.mergeItem(key, jsonValue);
}

export async function deleteAsyncStorage(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}
