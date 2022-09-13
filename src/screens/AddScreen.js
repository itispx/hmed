import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import { vh } from "../library/viewport-units";

import Styles from "../constants/Styles";

import TimePicker from "../components/UI/Add/TimePicker";
import NameInput from "../components/UI/Add/NameInput";
import QuantityInput from "../components/UI/Add/QuantityInput";
import DayBubble from "../components/UI/DayBubble";
import SaveIcon from "../components/UI/Add/SaveIcon";

const AddScreen = ({ navigation }) => {
  const days = [...Array(7).keys()];

  const [hour, setHour] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);

  const [daysError, setDaysError] = useState("");

  function selectDayHandler(day) {
    if (selectedDays.includes(day)) {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TimePicker setHour={setHour} setMinutes={setMinutes} />

      <NameInput value={name} setName={setName} />

      <QuantityInput setQuantity={setQuantity} />

      <FlatList
        overScrollMode="never"
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={days}
        renderItem={({ item, index }) => (
          <DayBubble
            height={60}
            fontSize={15}
            key={index}
            index={index}
            isSelected={selectedDays.includes(item)}
            selectBubble={() => selectDayHandler(item)}
          />
        )}
      />

      <Text style={Styles.errorText}>{daysError}</Text>

      <View style={{ marginTop: 10 }}>
        <SaveIcon
          onPress={() => {
            if (selectedDays.length === 0) {
              console.log("empty");
              setDaysError("Selecione pelo menos 1 dia");
              return;
            }
            if (daysError !== "") {
              console.log("clean");
              setDaysError("");
            }

            // console.log("save schedule:");
            // console.log(`time: ${hour}:${minutes}`);
            // console.log("name:", name);
            // console.log("quantity:", quantity);
            // console.log("days:", selectedDays);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 15,
  },
});

export default AddScreen;
