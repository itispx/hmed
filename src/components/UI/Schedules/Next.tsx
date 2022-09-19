import React from "react";
import { View, Text } from "react-native";

import { rfValue } from "../../../library/viewport-units";

import useAppSelector from "../../../hooks/useAppSelector";

import { stringToDate } from "../../../library/string-to-date";

import Colors from "../../../constants/Colors";

import Icon from "react-native-vector-icons/FontAwesome5";
import ScheduleInterface from "../../../interfaces/schedule-interface";

function findNotTaken(item: ScheduleInterface) {
  const currentTime = new Date().toLocaleTimeString();
  const scheduleTime = stringToDate(item.time).toLocaleTimeString();
  const notTaken = currentTime < scheduleTime;

  if (notTaken) {
    return item;
  }
}

const Next: React.FC = () => {
  const schedule = useAppSelector((state) => {
    const today = new Date().getDay();

    const schedulesToday = state.schedules.schedules
      .filter((i) => i.days.includes(today))
      .sort((a, b) => {
        const aConverted = stringToDate(a.time).getTime();
        const bConverted = stringToDate(b.time).getTime();

        return aConverted - bConverted;
      });

    for (let i = 0; i < schedulesToday.length; i++) {
      const schedule = findNotTaken(schedulesToday[i]);
      if (schedule) {
        return schedule;
      }
    }

    let index = today + 1;
    while (index !== today) {
      const schedulesIndex = state.schedules.schedules
        .filter((i) => i.days.includes(index))
        .sort((a, b) => {
          const aConverted = stringToDate(a.time).getTime();
          const bConverted = stringToDate(b.time).getTime();

          return aConverted - bConverted;
        });

      if (schedulesIndex[0]) {
        return schedulesIndex[0];
      }

      index = index === 6 ? 0 : index + 1;
    }
  });

  return schedule ? (
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
  ) : null;
};

export default Next;
