import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import { RFValue } from "../../../library/viewport-units";

import Colors from "../../../constants/Colors";

const AddIcon = ({ navigate }) => {
  return (
    <TouchableHighlight
      underlayColor={false}
      activeOpacity={0.75}
      onPress={navigate}
    >
      <View style={[styles.container, styles.shadow]}>
        <Text style={styles.icon}>+</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: Colors.accent,
  },
  icon: {
    fontSize: RFValue(40),
    color: "#FFF",
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

export default AddIcon;
