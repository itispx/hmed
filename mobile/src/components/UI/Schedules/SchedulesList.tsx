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
        const currentTime = new Date();
        const scheduleTime = stringToDate(item.time);

        const today = new Date().getDay();
        let taken = false;
        if (today === selectedDay) {
          taken = currentTime > scheduleTime;
        } else if (today > selectedDay) {
          taken = true;
        }

        let title = "";

        if (taken) {
          title = "Aplicado";
        } else if (Math.abs(scheduleTime.getTime() - currentTime.getTime()) / 36e5 < 1) {
          if (scheduleTime.getMinutes() >= currentTime.getMinutes()) {
            title = `Daqui à ${
              scheduleTime.getMinutes() - currentTime.getMinutes()
            } minutos`;
          } else {
            title = `Daqui à ${
              scheduleTime.getMinutes() - currentTime.getMinutes() + 60
            } minutos`;
          }
        } else {
          title = "Em breve";
        }

        return { ...item, taken, title };
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
