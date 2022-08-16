import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import HomeStack from "./navigation/HomeStack";

const Layout = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};
export default Layout;
