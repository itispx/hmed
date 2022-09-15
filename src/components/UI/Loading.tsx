import React from "react";
import { View, ActivityIndicator, StyleProp, ViewStyle } from "react-native";

import Colors from "../../constants/Colors";

interface Props {
  style: StyleProp<ViewStyle>;
  size: number;
  color: string;
}

const Loading: React.FC<Props> = ({ style, size, color }) => {
  return (
    <View style={[{ justifyContent: "center" }, style]}>
      <ActivityIndicator
        size={size || "large"}
        color={color || Colors.primary}
      />
    </View>
  );
};

export default Loading;
