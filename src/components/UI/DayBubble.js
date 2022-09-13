import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from "react-native";

import Colors from "../../constants/Colors";

const DayBubble = ({ height, fontSize, index, isSelected, selectBubble }) => {
  const [title] = useState(() => {
    const values = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

    return values[index];
  });

  return (
    <TouchableHighlight
      underlayColor={false}
      activeOpacity={0.75}
      onPress={selectBubble}
    >
      <View
        style={[
          styles.container,
          styles.shadow,
          { backgroundColor: isSelected ? Colors.accent : Colors.grey },
          { height: height ?? 90 },
        ]}
      >
        <Text style={[styles.title, { fontSize: fontSize ?? 20 }]}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 45,
  },
  title: {
    fontWeight: "bold",
    color: "#FFF",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default DayBubble;
