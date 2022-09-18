import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";

import { rfValue } from "../../../library/viewport-units";

import Icon from "react-native-vector-icons/FontAwesome5";

import Styles from "../../../constants/Styles";
import Colors from "../../../constants/Colors";

interface Props {
  onPress: () => void;
}

const SaveIcon: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableHighlight underlayColor="none" onPress={onPress}>
      <View style={[styles.container, Styles.shadow]}>
        <Icon name="check" size={rfValue(40)} color="#FFF" />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: Colors.accent,
  },
});

export default SaveIcon;
