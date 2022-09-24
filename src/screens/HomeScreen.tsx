import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamsList } from "../navigation/HomeStack";

import KeyboardAwareScrollView from "../components/KeyboardAwareScrollView";

import { initializeStateAction } from "../actions/schedulesActions";

import Colors from "../constants/Colors";

import Header from "../components/UI/Home/Header";
import Loading from "../components/UI/Loading";
import Schedules from "../components/UI/Schedules/Schedules";
import AddIcon from "../components/UI/Add/AddIcon";

interface Props {
  navigation: StackNavigationProp<HomeStackParamsList, "HomeScreen">;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void initializeStateHandler();
  }, []);

  async function initializeStateHandler() {
    await initializeStateAction();

    setIsLoading(false);
  }

  return isLoading ? (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: Colors.background }}
    >
      <Loading color={Colors.accent} />
    </View>
  ) : (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Header />
          <Schedules />
        </View>
      </KeyboardAwareScrollView>
      <AddIcon onPress={() => navigation.navigate("AddScreen")} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
