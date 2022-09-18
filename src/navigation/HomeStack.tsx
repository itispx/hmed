import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

export type HomeStackParamsList = {
  HomeScreen: undefined;
  AddScreen: undefined;
};

const Stack = createStackNavigator<HomeStackParamsList>();

import HomeScreen from "../screens/HomeScreen";
import AddScreen from "../screens/AddScreen";

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
