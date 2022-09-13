import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import { vh } from "../library/viewport-units";

import { Modalize } from "react-native-modalize";

import TimePicker from "../components/UI/Add/TimePicker";
import NameInput from "../components/UI/Add/NameInput";
import DayBubble from "../components/UI/DayBubble";

const AddScreen = ({ modalizeRef }) => {
  const days = [...Array(7).keys()];

  const [hour, setHour] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [name, setName] = useState("");
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
      <View style={{ flex: 1, alignItems: "center" }}>
        <TimePicker setHour={setHour} setMinutes={setMinutes} />

        <NameInput value={name} setName={setName} />

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
    marginTop: 60,
  },
});

export default AddScreen;
