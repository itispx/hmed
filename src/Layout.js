import React, { useLayoutEffect, useRef } from "react";
import { StatusBar } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import AddScreen from "./screens/AddScreen";

const Layout = () => {
  useLayoutEffect(() => {
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle("light-content");
  }, []);

  const addScreenRef = useRef();

  return (
    <>
      <HomeScreen addScreenRef={addScreenRef} />
      <AddScreen modalizeRef={addScreenRef} />
    </>
  );
};
export default Layout;
