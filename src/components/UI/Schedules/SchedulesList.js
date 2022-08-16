import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import schedulesActions from "../../../actions/schedules";

import ScheduleItem from "./ScheduleItem";
import Loading from "../Loading";

const SchedulesList = (props) => {
  const selectedDay = useSelector((state) => state.ui.selectedSchedule);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([
    {
      id: 1,
      time: "10:00",
      title: "Aplicado às 10:04",
      name: "Tylenol",
      amount: 30,
      taken: true,
    },
  ]);

  useEffect(() => {
    getSchedule();
  }, [selectedDay]);

  async function getSchedule() {
    try {
      setIsLoading(true);

      const { success } = await schedulesActions.getScheduleFromDay(
        selectedDay
      );

      if (success) {
        setData(success.items);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={[styles.container, props.style]}>
      {isLoading ? (
        <Loading />
      ) : (
        data.map((item, index) => {
          return (
            <ScheduleItem
              key={item.id}
              time={item.time}
              title={item.title}
              name={item.name}
              amount={item.amount}
              taken={item.taken}
            />
          );
        })
      )}
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
