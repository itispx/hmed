import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import { vh } from "../library/viewport-units";

import { Modalize } from "react-native-modalize";

import DayBubble from "../components/UI/DayBubble";

const AddScreen = ({ modalizeRef }) => {
  const days = [...Array(7).keys()];

  const [selectedDays, setSelectedDays] = useState([]);

  function selectDayHandler(day) {
    if (selectedDays.includes(day)) {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  }

  return (
    <Modalize ref={modalizeRef} modalHeight={vh(100)}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          overScrollMode="never"
          style={styles.flatlist}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={days}
          renderItem={({ item, index }) => (
            <DayBubble
              key={index}
              index={index}
              isSelected={selectedDays.includes(item)}
              selectBubble={() => selectDayHandler(item)}
            />
          )}
        />
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingVertical: 15,
  },
});

export default AddScreen;
