import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Colors from "../../../constants/Colors";

const DayBubble = ({ index, isSelected, selectBubble }) => {
  const [title] = useState(() => {
    switch (index) {
      case 0:
        return "DOM";
      case 1:
        return "SEG";
      case 2:
        return "TER";
      case 3:
        return "QUA";
      case 4:
        return "QUI";
      case 5:
        return "SEX";
      case 6:
        return "SAB";
    }
  });

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={selectBubble}>
      <View
        style={[
          styles.container,
          { backgroundColor: isSelected ? Colors.accent : Colors.grey },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    aspectRatio: 1,
    borderRadius: 45,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default DayBubble;
