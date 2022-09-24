import React from "react";
import { View, Text } from "react-native";

import { rfValue } from "../../../library/viewport-units";

import useAppSelector from "../../../hooks/useAppSelector";

import { stringToDate } from "../../../library/string-to-date";

import Colors from "../../../constants/Colors";
import { weekdays } from "../../../constants/values";

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

interface SelectorInterface extends ScheduleInterface {
  title: string;
}

const Next: React.FC = () => {
  const schedule = useAppSelector<SelectorInterface | undefined>((state) => {
    const now = new Date();
    const today = now.getDay();

    const schedulesToday = state.schedules.schedules
      .filter((i) => i.days.includes(today))
      .sort((a, b) => {
        const aConverted = stringToDate(a.time).getTime();
        const bConverted = stringToDate(b.time).getTime();

        return aConverted - bConverted;
      });

    for (let i = 0; i < schedulesToday.length; i++) {
      const currentSchedule = findNotTaken(schedulesToday[i]);
      if (currentSchedule) {
        let title = "";

        const scheduleTime = stringToDate(currentSchedule.time);

        if (Math.abs(scheduleTime.getTime() - now.getTime()) / 36e5 < 1) {
          if (scheduleTime.getMinutes() >= now.getMinutes()) {
            title = `Daqui à ${scheduleTime.getMinutes() - now.getMinutes()} minutos`;
          } else {
            title = `Daqui à ${
              scheduleTime.getMinutes() - now.getMinutes() + 60
            } minutos`;
          }
        } else {
          title = "Em breve";
        }

        return { ...currentSchedule, title };
      }
    }

    let index = today === 7 ? 0 : today + 1;
    while (index !== today) {
      const schedulesIndex = state.schedules.schedules
        .filter((i) => i.days.includes(index))
        .sort((a, b) => {
          const aConverted = stringToDate(a.time).getTime();
          const bConverted = stringToDate(b.time).getTime();

          return aConverted - bConverted;
        });

      if (schedulesIndex[0]) {
        let title = "";

        const scheduleTime = stringToDate(schedulesIndex[0].time);

        if (Math.abs(scheduleTime.getTime() - now.getTime()) / 36e5 < 1) {
          if (scheduleTime.getMinutes() >= now.getMinutes()) {
            title = `Daqui à ${scheduleTime.getMinutes() - now.getMinutes()} minutos`;
          } else {
            title = `Daqui à ${
              scheduleTime.getMinutes() - now.getMinutes() + 60
            } minutos`;
          }
        } else {
          const closest: number = schedulesIndex[0].days.reduce((a, b) => {
            const aDiff = Math.abs(a - today);
            const bDiff = Math.abs(b - today);

            if (aDiff == bDiff) {
              return a > b ? a : b;
            } else {
              return bDiff < aDiff ? b : a;
            }
          });

          title = weekdays[closest];
        }

        return { ...schedulesIndex[0], title };
      }

      index = index >= 6 ? 0 : index + 1;

      console.log({ index });
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
        <Text style={{ paddingLeft: 10, fontSize: rfValue(15), color: Colors.grey }}>
          {schedule.title}
        </Text>
      </View>
    </View>
  ) : null;
};

export default Next;
