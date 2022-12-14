import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamsList } from "../navigation/HomeStack";

import { FormikProps } from "formik";

import { addScheduleAction } from "../actions/schedulesActions";

import Styles from "../constants/Styles";

import KeyboardAwareScrollView from "../components/KeyboardAwareScrollView";
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

  const [isLoading, setIsLoading] = useState(false);
  const [hour, setHour] = useState("00");
  const [minutes, setMinutes] = useState("00");
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
  const quantityInputRef = useRef<FormikProps<{ quantity: number }>>(null);

  async function addScheduleHandler(): Promise<void> {
    try {
      if (selectedDays.length <= 0) {
        setDaysError("Selecione pelo menos 1 dia");
      } else {
        if (daysError !== "") {
          setDaysError("");
        }
      }

      nameInputRef.current?.handleSubmit();

      quantityInputRef.current?.handleSubmit();

      if (
        selectedDays.length <= 0 ||
        !nameInputRef.current?.values.name ||
        nameInputRef.current?.values.name.length <= 0 ||
        nameInputRef.current?.errors.name ||
        !quantityInputRef.current?.values.quantity ||
        quantityInputRef.current?.values.quantity <= 0 ||
        quantityInputRef.current?.errors.quantity
      ) {
        return;
      }

      setIsLoading(true);

      await addScheduleAction(
        `${hour}:${minutes}`,
        nameInputRef.current.values.name,
        quantityInputRef.current.values.quantity,
        selectedDays,
      );

      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView scrollViewProps={{ nestedScrollEnabled: true }}>
      <View style={styles.container}>
        {/* This is mainly to prevent the nested scrolls warning */}
        <ScrollView horizontal nestedScrollEnabled scrollEnabled={false}>
          <TimePicker setHour={setHour} setMinutes={setMinutes} />
        </ScrollView>

        <NameInput inputRef={nameInputRef} />

        <QuantityInput inputRef={quantityInputRef} />

        <View style={{ flexDirection: "row" }}>
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
        </View>

        <Text style={Styles.errorText}>{daysError}</Text>

        <View style={{ marginTop: 10 }}>
          <SaveIcon isLoading={isLoading} onPress={addScheduleHandler} />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
