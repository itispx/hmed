import React from "react";
import { StyleSheet, View, Text } from "react-native";

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
    }
  });

  return schedule ? (
    <View style={styles.container}>
      <View style={styles.medicationContainer}>
        <Text style={styles.nextMedication}>Próximo remédio - </Text>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{schedule.name}, </Text>
          <Text style={styles.quantity}>{schedule.quantity}mg</Text>
        </View>
      </View>

      <View style={styles.timeContainer}>
        <Icon
          name="clock"
          solid
          size={rfValue(40)}
          color={Colors.primary}
          style={{ padding: 5 }}
        />
        <Text style={styles.time}>{schedule.time}</Text>
        <Text style={styles.day}>{schedule.title}</Text>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 0,
    backgroundColor: "#FFF",
  },
  medicationContainer: {
    flexDirection: "row",
  },
  nextMedication: {
    fontSize: rfValue(18),
    color: Colors.grey,
    fontWeight: "bold",
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  name: {
    fontSize: rfValue(18),
    color: Colors.grey,
  },
  quantity: {
    fontSize: rfValue(19),
    color: Colors.grey,
    fontWeight: "600",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    marginBottom: 5,
    fontSize: rfValue(60),
    fontWeight: "bold",
    color: Colors.primary,
  },
  day: {
    paddingLeft: 10,
    fontSize: rfValue(15),
    color: Colors.grey,
  },
});

export default Next;
