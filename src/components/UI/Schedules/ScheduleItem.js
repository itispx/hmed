import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { RFValue, vw } from "../../../library/viewport-units";

import Colors from "../../../constants/Colors";

const ScheduleItem = ({ time, title, name, amount, taken }) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
      </View>

      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.name}>
            {name}, {amount}mg
          </Text>
        </View>
        <View
          style={[
            styles.checkMark,
            { backgroundColor: taken ? Colors.accent : Colors.darkGrey },
          ]}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 90,
    width: vw(90),
    borderRadius: 9,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "30%",
    backgroundColor: Colors.accent,
  },
  timeText: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "#FFF",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    paddingHorizontal: 10,
  },
  titleContainer: {
    justifyContent: "space-evenly",
    paddingVertical: 10,
    height: "100%",
  },
  title: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: RFValue(16),
    color: "#FFF",
    backgroundColor: Colors.darkGrey,
  },
  name: {
    fontSize: RFValue(23),
    color: Colors.lightGrey,
  },
  checkMark: {
    height: 50,
    aspectRatio: 1,
  },
});

export default ScheduleItem;
