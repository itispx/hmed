import { Dimensions, Platform, StatusBar } from "react-native";

export function vw(number: number): number {
  return Dimensions.get("window").width * (number / 100);
}

export function vh(number: number): number {
  return Dimensions.get("window").height * (number / 100);
}

export function vmin(number: number): number {
  return Math.min(
    Dimensions.get("window").width * (number / 100),
    Dimensions.get("window").height * (number / 100),
  );
}

export function vmax(number: number): number {
  return Math.max(
    Dimensions.get("window").width * (number / 100),
    Dimensions.get("window").height * (number / 100),
  );
}

// From ---> https://github.com/heyman333/react-native-responsive-fontsize
// Guideline height for standard 5" device screen is 680
export function rfValue(fontSize: number, standardScreenHeight = 680): number {
  const { height, width } = Dimensions.get("window");
  const standardLength = width > height ? width : height;

  let offset = 0;
  if (StatusBar.currentHeight !== undefined) {
    offset = width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight;
  }

  const deviceHeight =
    Platform.OS === "android" ? standardLength - offset : standardLength;

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}
