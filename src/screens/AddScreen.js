import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { vh } from "../library/viewport-units";

import { Modalize } from "react-native-modalize";

const AddScreen = ({ modalizeRef }) => {
  return (
    <Modalize ref={modalizeRef} modalHeight={vh(100)}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>AddScreen</Text>
      </View>
    </Modalize>
  );
};

export default AddScreen;
