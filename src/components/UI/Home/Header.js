import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";

import { vh, vw, RFValue } from "../../../library/viewport-units";

import Colors from "../../../constants/Colors";

const Header = () => {
  const [date, setDate] = useState("");

  useLayoutEffect(() => {
    const today = new Date();

    let day = today.getDate();

    const weekdayValues = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const weekday = weekdayValues[today.getDay()];

    const monthValues = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const month = monthValues[today.getMonth()];

    setDate(`${day} de ${month}, ${weekday}`);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.logo}
          source={require("../../../../assets/logo-light.png")}
        />
        <View style={styles.welcomeContainer}>
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
    fontSize: RFValue(30),
    color: "#FFF",
    fontWeight: "bold",
  },
  date: {
    fontSize: RFValue(15),
    color: Colors.accent,
  },
});

export default Header;
