import React, { useState, useEffect } from "react";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";

import useAppSelector from "../../../hooks/useAppSelector";

import ScheduleItem from "./ScheduleItem";

import ScheduleDisplayInterface from "../../../interfaces/schedule-display-interface";

import { stringToDate } from "../../../library/string-to-date";

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
    const schedulesArr = schedules
      .filter((item) => item.days.includes(selectedDay))
      .map((item) => {
        const currentTime = new Date().toLocaleTimeString();

        const scheduleTime = stringToDate(item.time).toLocaleTimeString();

        const today = new Date().getDay();
        let taken = false;
        if (today === selectedDay) {
          taken = currentTime > scheduleTime;
        } else if (today > selectedDay) {
          taken = true;
        }

        // TODO Calculate title

        return { ...item, taken };
      })
      .sort((a, b) => {
        const aConverted = stringToDate(a.time).getTime();
        const bConverted = stringToDate(b.time).getTime();

        return aConverted - bConverted;
      });

    setData((prev) => [...prev, ...schedulesArr]);
  }

  return (
    <View style={[styles.container, style]}>
      {data.map((item) => {
        return <ScheduleItem key={item.id} {...item} />;
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
