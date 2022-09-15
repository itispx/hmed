import React, { useState, useEffect } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

import useAppSelector from "../../../hooks/useAppSelector";

import ScheduleItem from "./ScheduleItem";

import ScheduleDisplayInterface from "../../../interfaces/schedule-display-interface";

interface Props {
  style: StyleProp<ViewStyle>;
}

const SchedulesList: React.FC<Props> = ({ style }) => {
  const selectedDay = useAppSelector((state) => state.ui.selectedScheduleDay);
  const schedules = useAppSelector((state) => state.schedules.schedules);

  const [data, setData] = useState<ScheduleDisplayInterface[]>([]);

  useEffect(() => {
    setData([]);
    setSchedules();
  }, [selectedDay, schedules]);

  function setSchedules() {
    const now = new Date();

    let schedulesArr = schedules
      .filter((item) => item.days.includes(selectedDay))
      .map((item) => {
        const currentTime = new Date().toLocaleTimeString();

        const time = item.time.split(":").map((v) => parseInt(v));
        const scheduleTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          ...time
        ).toLocaleTimeString();

        const taken = currentTime > scheduleTime;

        // TODO Calculate title

        return { ...item, taken };
      })
      .sort((a, b) => {
        const aTime = a.time.split(":").map((v) => parseInt(v));
        const aConverted = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          ...aTime
        ).getTime();

        const bTime = b.time.split(":").map((v) => parseInt(v));
        const bConverted = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          ...bTime
        ).getTime();

        return bConverted - aConverted;
      });

    setData((prev) => [...prev, ...schedulesArr]);
  }

  return (
    <View style={[styles.container, style]}>
      {data.map((item, index) => {
        return (
          <ScheduleItem
            key={item.id}
            id={item.id}
            time={item.time}
            name={item.name}
            quantity={item.quantity}
            days={item.days}
            taken={item.taken}
            title={item.title}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default SchedulesList;

// {
//   id: 1,
//   time: "10:00",
//   title: "Aplicado às 10:04",
//   name: "Tylenol",
//   amount: 30,
//   taken: true,
// },
