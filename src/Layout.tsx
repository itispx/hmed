import React, { useEffect, useLayoutEffect } from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import HomeStack from "./navigation/HomeStack";

import { initializeStateAction } from "./actions/schedulesActions";

const Layout: React.FC = () => {
  useLayoutEffect(() => {
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("light-content");
  }, []);

  useEffect(() => {
    initializeStateAction();
  }, []);

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};
export default Layout;
