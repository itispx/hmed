import React from "react";
import { View, Text } from "react-native";

import { rfValue } from "../../../library/viewport-units";

import useAppSelector from "../../../hooks/useAppSelector";

import { stringToDate } from "../../../library/string-to-date";

import Colors from "../../../constants/Colors";

import Icon from "react-native-vector-icons/FontAwesome5";

function Next() {
  const schedule = useAppSelector((state) => {
    return state.schedules.schedules
      .filter((item) => {
        const currentTime = new Date().toLocaleTimeString();
        const scheduleTime = stringToDate(item.time).toLocaleTimeString();

        const taken = currentTime < scheduleTime;

        if (taken) {
          return item;
        }
      })
      .sort((a, b) => {
        const aConverted = stringToDate(a.time).getTime();
        const bConverted = stringToDate(b.time).getTime();

        return aConverted - bConverted;
      })[0];
  });

  return (
    schedule && (
      <View style={{ padding: 15, paddingBottom: 0, backgroundColor: "#FFF" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: rfValue(18),
              color: Colors.grey,
              fontWeight: "bold",
            }}
          >
            Próximo remédio{" "}
          </Text>
          <Text style={{ fontSize: rfValue(18), color: Colors.grey }}>
            - {schedule.name}, {schedule.quantity}mg
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="clock"
            solid
            size={rfValue(40)}
            color={Colors.primary}
            style={{ padding: 5 }}
          />
          <Text
            style={{
              marginBottom: 5,
              fontSize: rfValue(60),
              fontWeight: "bold",
              color: Colors.primary,
            }}
          >
            {schedule.time}
          </Text>
        </View>
      </View>
    )
  );
}

export default Next;
