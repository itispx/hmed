import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { RFValue, vw } from "../../../library/viewport-units";

import Colors from "../../../constants/Colors";

import Icon from "react-native-vector-icons/AntDesign";

const ScheduleItem = ({ id, time, title, name, quantity, taken }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.timeContainer,
          { backgroundColor: taken ? Colors.accent : Colors.primary },
        ]}
      >
        <Text style={styles.timeText}>{time}</Text>
      </View>

      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          {/* <Text style={styles.title}>{title}</Text> */}
          <Text
            style={[
              styles.name,
              { color: taken ? Colors.grey : Colors.primary },
            ]}
          >
            {name}, {quantity}mg
          </Text>
        </View>
        <Icon
          name="check"
          size={RFValue(40)}
          color={taken ? Colors.accent : Colors.grey}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 9,
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
    backgroundColor: Colors.grey,
  },
  name: {
    fontSize: RFValue(23),
  },
  checkMark: {},
});

export default ScheduleItem;
