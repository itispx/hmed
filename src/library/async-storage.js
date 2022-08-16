export async function getAsyncStorage(key = getKey()) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch ({ message }) {
    return { error: message };
  }
}

export async function setAsyncStorage(value, key = getKey()) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch ({ message }) {
    return { error: { message } };
  }
}

export async function mergeAsyncStorage(value, key = getKey()) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
  } catch ({ message }) {
    return { error: { message } };
  }
}

export async function deleteAsyncStorage(key = getKey()) {
  try {
    await AsyncStorage.removeItem(key);
  } catch ({ message }) {
    return { error: { message } };
  }
}

export function getKey() {
  return "user:device";
}
