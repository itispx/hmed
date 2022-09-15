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
    getSchedules();
  }, [selectedDay, schedules]);

  function getSchedules() {
    schedules.forEach((item) => {
      if (item.days.includes(selectedDay)) {
        const currentTime = new Date().toLocaleTimeString();

        const time = item.time.split(":").map((v) => parseInt(v));

        const now = new Date();
        const scheduleTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          ...time
        ).toLocaleTimeString();

        const taken = currentTime > scheduleTime;

        // TODO Calculate title

        setData((prev) => [...prev, { ...item, taken }]);
      }
    });
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
