import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";

import { RFValue } from "../../../library/viewport-units";

import Styles from "../../../constants/Styles";
import Colors from "../../../constants/Colors";

import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  onPress: () => void;
}

const AddIcon: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableHighlight underlayColor="none" onPress={onPress}>
      <View style={[styles.container, Styles.shadow]}>
        <Icon name="plus" solid size={RFValue(40)} color="#FFF" />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: Colors.accent,
  },
  icon: {
    fontSize: RFValue(40),
    color: "#FFF",
  },
});

export default AddIcon;
