import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import DayBubble from "../DayBubble";

const SchedulesList = () => {
  const data = [0, 1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.container}>
      {/* Get closest schedule */}

      {/* Show days of the week */}
      <FlatList
        horizontal
        data={data}
        renderItem={({ item, index }) => <DayBubble key={index} index={item} />}
      />

      {/* Schedule for day of the week */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SchedulesList;
