import React from "react";
import { StyleSheet, View } from "react-native";

import KeyboardAwareScrollView from "../components/KeyboardAwareScrollView";

import Header from "../components/UI/Home/Header";

import SchedulesList from "../components/UI/Home/SchedulesList";

const HomeScreen = () => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Header />
        <SchedulesList />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default HomeScreen;
