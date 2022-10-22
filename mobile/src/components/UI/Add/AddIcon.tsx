import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";

import { rfValue } from "../../../library/viewport-units";

import Styles from "../../../constants/Styles";
import Colors from "../../../constants/Colors";

import { showError } from "../../../actions/toastsActions";

import Icon from "react-native-vector-icons/FontAwesome5";

import Loading from "../Loading";

interface Props {
  onPress: () => void;
}

const AddIcon: React.FC<Props> = ({ onPress }) => {
  const [isLoading, setIsLoading] = useState(false);

  function onPressHandler() {
    try {
      setIsLoading(true);
      onPress();
      setIsLoading(false);
    } catch ({ message }) {
      showError(message as string);
    }
  }

  return (
    <TouchableHighlight
      underlayColor="none"
      disabled={isLoading}
      onPress={onPressHandler}
    >
      <View style={[styles.container, Styles.shadow]}>
        {isLoading ? (
          <Loading color="#FFF" />
        ) : (
          <Icon name="plus" solid size={rfValue(40)} color="#FFF" />
        )}
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
});

export default AddIcon;
