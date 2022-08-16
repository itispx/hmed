import { Dimensions, Platform, StatusBar } from "react-native";

export const vw = (number) => Dimensions.get("window").width * (number / 100);
export const vh = (number) => Dimensions.get("window").height * (number / 100);
export const vmin = (number) =>
  Math.min(
    Dimensions.get("window").width * (number / 100),
    Dimensions.get("window").height * (number / 100)
  );
export const vmax = (number) =>
  Math.max(
    Dimensions.get("window").width * (number / 100),
    Dimensions.get("window").height * (number / 100)
  );

// From ---> https://github.com/heyman333/react-native-responsive-fontsize
// Guideline height for standard 5" device screen is 680
export function RFValue(fontSize, standardScreenHeight = 680) {
  const { height, width } = Dimensions.get("window");
  const standardLength = width > height ? width : height;
  const offset =
    width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight;

  const deviceHeight =
    Platform.OS === "android" ? standardLength - offset : standardLength;

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}
