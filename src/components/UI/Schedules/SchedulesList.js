import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import schedulesActions from "../../../actions/schedules";

import ScheduleItem from "./ScheduleItem";

const SchedulesList = (props) => {
  const selectedDay = useSelector((state) => state.ui.selectedSchedule);

  const [data, setData] = useState([]);

  useEffect(() => {
    getSchedule();
  }, [selectedDay]);

  async function getSchedule() {
    const data = await schedulesActions.getScheduleFromDay(selectedDay);

    setData(data);
  }

  return (
    <View style={[styles.container, props.style]}>
      <ScheduleItem
        time={"10:00"}
        title={"Aplicado às 10:04"}
        name={"Tylenol"}
        amount={30}
        taken
      />
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
