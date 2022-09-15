import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";

interface Props {
  style: StyleProp<ViewStyle>;
  fontSize: number;
  label: string | number;
}

const ListItem: React.FC<Props> = React.memo(({ style, fontSize, label }) => (
  <View style={style}>
    <Text style={{ fontSize }}>{label}</Text>
  </View>
));

export default ListItem;
