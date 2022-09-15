import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getAsyncStorage(
  key: string = getKey()
): Promise<object | { error: { message: string } }> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch ({ message }) {
    if (typeof message === "string") {
      return { error: { message } };
    } else {
      return { error: { message: "Failed to get async storage" } };
    }
  }
}

export async function setAsyncStorage(
  value: object,
  key: string = getKey()
): Promise<undefined | { error: { message: string } }> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch ({ message }) {
    if (typeof message === "string") {
      return { error: { message } };
    }
  }
}

export async function mergeAsyncStorage(
  value: object,
  key: string = getKey()
): Promise<undefined | { error: { message: string } }> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
  } catch ({ message }) {
    if (typeof message === "string") {
      return { error: { message } };
    }
  }
}

export async function deleteAsyncStorage(key: string = getKey()) {
  try {
    await AsyncStorage.removeItem(key);
  } catch ({ message }) {
    if (typeof message === "string") {
      return { error: { message } };
    }
  }
}

export function getKey(): string {
  return "user:device";
}
