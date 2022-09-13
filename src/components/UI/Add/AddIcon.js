import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import { RFValue } from "../../../library/viewport-units";

import Styles from "../../../constants/Styles";
import Colors from "../../../constants/Colors";

const AddIcon = ({ onPress }) => {
  return (
    <TouchableHighlight underlayColor={false} onPress={onPress}>
      <View style={[styles.container, Styles.shadow]}>
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
});

export default AddIcon;
