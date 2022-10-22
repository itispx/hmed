import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";
import { abvWeekdays } from "../../constants/values";

interface Props {
  height?: number;
  fontSize?: number;
  index: number;
  isSelected: boolean;
  selectBubble: () => void;
}

const DayBubble: React.FC<Props> = ({
  height = 90,
  fontSize = 20,
  index,
  isSelected,
  selectBubble,
}) => {
  const [title] = useState(() => {
    return abvWeekdays[index];
  });

  return (
    <TouchableHighlight
      // Padding for shadow
      style={{ paddingBottom: 5 }}
      underlayColor="none"
      activeOpacity={0.75}
      onPress={selectBubble}
    >
      <View
        style={[
          styles.container,
          Styles.shadow,
          { height, backgroundColor: isSelected ? Colors.accent : Colors.grey },
        ]}
      >
        <Text style={[styles.title, { fontSize }]}>{title}</Text>
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
