import React from "react";
import { StyleSheet, View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamsList } from "../navigation/HomeStack";

import KeyboardAwareScrollView from "../components/KeyboardAwareScrollView";

import Header from "../components/UI/Home/Header";
import Schedules from "../components/UI/Schedules/Schedules";
import AddIcon from "../components/UI/Add/AddIcon";

interface Props {
  navigation: StackNavigationProp<HomeStackParamsList, "HomeScreen">;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Header />
        <Schedules />
        {/* <AddIcon onPress={() => navigation.navigate("AddScreen")} /> */}
        <AddIcon onPress={() => navigation.navigate("AddScreen")} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default HomeScreen;
