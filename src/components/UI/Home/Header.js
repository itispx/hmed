import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Image, StatusBar } from "react-native";

import { vh, vw, RFValue } from "../../../library/viewport-units";

import Colors from "../../../constants/Colors";

const Header = () => {
  const [date, setDate] = useState("");

  useLayoutEffect(() => {
    const today = new Date();

    let day = today.getDate();

    let weekday = "";
    switch (today.getDay()) {
      case 0:
        weekday = "Domingo";
        break;
      case 1:
        weekday = "Segunda-feira";
        break;
      case 2:
        weekday = "Terça-feira";
        break;
      case 3:
        weekday = "Quarta-feira";
        break;
      case 4:
        weekday = "Quinta-feira";
        break;
      case 5:
        weekday = "Sexta-feira";
        break;
      case 6:
        weekday = "Sábado";
        break;
    }

    let month = "";
    switch (today.getMonth()) {
      case 0:
        month = "Janeiro";
        break;
      case 1:
        month = "Fevereiro";
        break;
      case 2:
        month = "Março";
        break;
      case 3:
        month = "Abril";
        break;
      case 4:
        month = "Maio";
        break;
      case 5:
        month = "Junho";
        break;
      case 6:
        month = "Julho";
        break;
      case 7:
        month = "Agosto";
        break;
      case 8:
        month = "Setembro";
        break;
      case 9:
        month = "Outubro";
        break;
      case 10:
        month = "Novembro";
        break;
      case 11:
        month = "Dezembro";
        break;
    }

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
    backgroundColor: Colors.primary,
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
