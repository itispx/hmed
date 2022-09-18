import React, { useLayoutEffect } from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import HomeStack from "./navigation/HomeStack";

const Layout: React.FC = () => {
  useLayoutEffect(() => {
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};
export default Layout;
