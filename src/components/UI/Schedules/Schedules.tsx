import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Next from "./Next";
import RenderDay from "./RenderDay";
import SchedulesList from "./SchedulesList";

const Schedules: React.FC = () => {
  const days = [...Array(7).keys()];

  return (
    <View style={styles.container}>
      <View>
        {/* Get next schedule */}
        <Next />

        {/* Show days of the week */}
        <FlatList
          overScrollMode="never"
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={days}
          renderItem={({ item, index }) => (
            <RenderDay key={index} index={item} />
          )}
        />
      </View>

      {/* Schedule for the day of the week */}
      <SchedulesList style={{ marginTop: 15 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  flatlist: {
    paddingVertical: 15,
  },
});

export default Schedules;
