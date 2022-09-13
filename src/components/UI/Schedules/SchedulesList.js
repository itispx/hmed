import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";

import ScheduleItem from "./ScheduleItem";

const SchedulesList = (props) => {
  const selectedDay = useSelector((state) => state.ui.selectedSchedule);
  const schedules = useSelector((state) => state.schedules.schedules);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData([]);
    getSchedules();
  }, [selectedDay, schedules]);

  function getSchedules() {
    schedules.forEach((item) => {
      if (item.days.includes(selectedDay)) {
        const currentTime = new Date().toLocaleTimeString();

        const time = item.time.split(":");
        const now = new Date();
        const scheduleTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          ...time
        ).toLocaleTimeString();

        const taken = currentTime > scheduleTime;

        setData((prev) => [...prev, { ...item, taken }]);
      }
    });
  }

  return (
    <View style={[styles.container, props.style]}>
      {data.map((item, index) => {
        return (
          <ScheduleItem
            key={item.id}
            id={item.id}
            time={item.time}
            title={item.title}
            name={item.name}
            quantity={item.quantity}
            taken={item.taken}
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
