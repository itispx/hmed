import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

import KeyboardAwareScrollView from "../components/KeyboardAwareScrollView";

import Header from "../components/UI/Home/Header";

const HomeScreen = () => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Header />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default HomeScreen;
