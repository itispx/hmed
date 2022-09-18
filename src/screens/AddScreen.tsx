import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamsList } from "../navigation/HomeStack";

import { FormikProps } from "formik";

import { addSchedule } from "../actions/schedulesActions";

import Styles from "../constants/Styles";

import TimePicker from "../components/UI/Add/TimePicker";
import NameInput from "../components/UI/Add/NameInput";
import QuantityInput from "../components/UI/Add/QuantityInput";
import DayBubble from "../components/UI/DayBubble";
import SaveIcon from "../components/UI/Add/SaveIcon";

interface Props {
  navigation: StackNavigationProp<HomeStackParamsList, "AddScreen">;
}

const AddScreen: React.FC<Props> = ({ navigation }) => {
  const days = [...Array(7).keys()];

  const [hour, setHour] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(-1);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const [daysError, setDaysError] = useState("");

  function selectDayHandler(day: number) {
    if (selectedDays.includes(day)) {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  }

  const nameInputRef = useRef<FormikProps<{ name: string }>>(null);
  const quantityInputRef = useRef<FormikProps<{ quantity: string }>>(null);

  async function addScheduleHandler(): Promise<void> {
    if (selectedDays.length <= 0) {
      setDaysError("Selecione pelo menos 1 dia");
    } else {
      if (daysError !== "") {
        setDaysError("");
      }
    }

    nameInputRef.current?.handleSubmit();

    quantityInputRef.current?.handleSubmit();

    if (selectedDays.length <= 0 || name.length <= 0 || quantity <= 0) {
      return;
    }

    await addSchedule(`${hour}:${minutes}`, name, quantity, selectedDays);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TimePicker setHour={setHour} setMinutes={setMinutes} />

      <NameInput setName={setName} inputRef={nameInputRef} />

      <QuantityInput setQuantity={setQuantity} inputRef={quantityInputRef} />

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
        <SaveIcon onPress={addScheduleHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  flatlist: {
    marginTop: 15,
  },
});

export default AddScreen;
