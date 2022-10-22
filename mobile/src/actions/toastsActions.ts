import Toast from "react-native-toast-message";

export function showSuccess(text1: string, text2?: string): void {
  Toast.show({
    type: "success",
    text1,
    text2,
  });
}

export function showError(text1: string, text2?: string): void {
  Toast.show({
    type: "error",
    text1,
    text2,
  });
}
