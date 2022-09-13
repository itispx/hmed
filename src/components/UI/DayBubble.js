import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";

const DayBubble = ({ height, fontSize, index, isSelected, selectBubble }) => {
  const [title] = useState(() => {
    const values = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

    return values[index];
  });

  return (
    <TouchableHighlight
      // Padding for shadow
      style={{ paddingBottom: 5 }}
      underlayColor={false}
      activeOpacity={0.75}
      onPress={selectBubble}
    >
      <View
        style={[
          styles.container,
          Styles.shadow,
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
});

export default DayBubble;
