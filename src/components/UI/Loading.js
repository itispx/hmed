import React from "react";
import { View, ActivityIndicator } from "react-native";

import Colors from "../../constants/Colors";

const Loading = (props) => {
  return (
    <View style={[{ justifyContent: "center" }, props.style]}>
      <ActivityIndicator
        size={props.size ? props.size : "large"}
        color={props.color ? props.color : Colors.primary}
      />
    </View>
  );
};

export default Loading;
