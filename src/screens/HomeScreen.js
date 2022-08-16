import React from "react";
import { StyleSheet, View } from "react-native";

import KeyboardAwareScrollView from "../components/KeyboardAwareScrollView";

import Header from "../components/UI/Home/Header";

import Schedules from "../components/UI/Schedules/Schedules";

const HomeScreen = () => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Header />
        <Schedules />
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
