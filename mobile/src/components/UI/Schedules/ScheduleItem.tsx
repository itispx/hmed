import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import { rfValue, vw } from "../../../library/viewport-units";

import { removeScheduleAction } from "../../../actions/schedulesActions";

import Colors from "../../../constants/Colors";

import Icon from "react-native-vector-icons/FontAwesome5";

import ScheduleDisplayInterface from "../../../interfaces/schedule-display-interface";

const ScheduleItem: React.FC<ScheduleDisplayInterface> = ({
  id,
  notificationIDs,
  time,
  name,
  quantity,
  taken,
  title,
}) => {
  return (
    <TouchableHighlight
      underlayColor="none"
      onPress={() => removeScheduleAction(id, notificationIDs)}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.timeContainer,
            { backgroundColor: taken ? Colors.accent : Colors.primary },
          ]}
        >
          <Text style={styles.time}>{time}</Text>
        </View>

        <View style={styles.innerContainer}>
          {title && <Text style={styles.title}>{title}</Text>}

          <Text style={[styles.name, { color: taken ? Colors.grey : Colors.primary }]}>
            {name}
          </Text>
          <Text
            style={[styles.quantity, { color: taken ? Colors.grey : Colors.primary }]}
          >
            {quantity}mg
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Icon
            name="check"
            size={rfValue(40)}
            color={taken ? Colors.accent : Colors.grey}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 9,
    minHeight: 90,
    width: vw(90),
    borderRadius: 9,
    backgroundColor: "#FFF",
    overflow: "hidden",
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  time: {
    fontSize: rfValue(30),
    fontWeight: "bold",
    color: "#FFF",
  },
  innerContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 15,
  },
  title: {
    alignSelf: "flex-start",
    marginTop: 3,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 3,
    backgroundColor: Colors.grey,
    fontSize: rfValue(16),
    color: "#FFF",
  },
  name: {
    fontSize: rfValue(23),
  },
  quantity: {
    fontSize: rfValue(24),
    fontWeight: "600",
  },
  iconContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default ScheduleItem;
