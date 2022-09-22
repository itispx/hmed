import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  ImageSourcePropType,
} from "react-native";

import { vh, rfValue } from "../../../library/viewport-units";

import Colors from "../../../constants/Colors";
import { weekdays, months } from "../../../constants/values";

import logoImage from "../../../../assets/logo-light.png";

const Header: React.FC = () => {
  const [date, setDate] = useState("");

  useLayoutEffect(() => {
    const today = new Date();

    const day = today.getDate();

    const weekday = weekdays[today.getDay()];

    const month = months[today.getMonth()];

    setDate(`${day} de ${month}, ${weekday}`);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.logo} source={logoImage as ImageSourcePropType} />
        <View>
          <Text style={styles.welcome}>Bem-vindo</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: vh(30),
    maxHeight: 250,
    width: "100%",
    backgroundColor: Colors.background,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 25,
  },
  logo: {
    height: 40,
    width: 130,
    resizeMode: "contain",
  },
  welcome: {
    fontSize: rfValue(30),
    color: "#FFF",
    fontWeight: "bold",
  },
  date: {
    fontSize: rfValue(15),
    color: Colors.accent,
  },
});

export default Header;
