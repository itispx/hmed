import React, { useState } from "react";
import { View, Text } from "react-native";

import { RFValue } from "../../../library/viewport-units";

import useAppSelector from "../../../hooks/useAppSelector";

import Colors from "../../../constants/Colors";

import Icon from "react-native-vector-icons/FontAwesome5";

const Next: React.FC = () => {
  const [today] = useState(() => new Date().getDate());

  const schedule = {
    time: "16:00",
    name: "Doralgina",
    quantity: 30,
  };

  return (
    <View style={{ padding: 15, paddingBottom: 0, backgroundColor: "#FFF" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontSize: RFValue(18),
            color: Colors.grey,
            fontWeight: "bold",
          }}
        >
          Próximo remédio{" "}
        </Text>
        <Text style={{ fontSize: RFValue(18), color: Colors.grey }}>
          - {schedule.name} {schedule.quantity}mg
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          name="clock"
          solid
          size={RFValue(40)}
          color={Colors.primary}
          style={{ padding: 5 }}
        />
        <Text
          style={{
            marginBottom: 5,
            fontSize: RFValue(60),
            fontWeight: "bold",
            color: Colors.primary,
          }}
        >
          {schedule.time}
        </Text>
      </View>
    </View>
  );
};

export default Next;
