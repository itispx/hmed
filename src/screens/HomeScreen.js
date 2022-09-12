import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

import KeyboardAwareScrollView from "../components/KeyboardAwareScrollView";

import Header from "../components/UI/Home/Header";
import Schedules from "../components/UI/Schedules/Schedules";
import AddIcon from "../components/UI/Add/AddIcon";

const HomeScreen = ({ addScreenRef }) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Header />
        <Schedules />
        <AddIcon onPress={() => addScreenRef.current?.open()} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
