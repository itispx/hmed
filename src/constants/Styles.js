import { StyleSheet } from "react-native";

import Colors from "./Colors";

export default StyleSheet.create({
  errorText: {
    color: Colors.error,
    marginTop: 2,
    marginBottom: 3,
    textAlign: "left",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
