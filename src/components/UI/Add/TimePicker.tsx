import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { vw } from "../../../library/viewport-units";

import VerticalSwipe from "../VerticalSwipe";

interface Props {
  setHour: (hour: string) => void;
  setMinutes: (hour: string) => void;
}

const TimePicker: React.FC<Props> = ({ setHour, setMinutes }) => {
  const hours = [...Array(24).keys()].map((v) =>
    v < 10 ? `0${v}` : v.toString()
  );

  const minutes = [...Array(60).keys()].map((v) =>
    v < 10 ? `0${v}` : v.toString()
  );

  return (
    <View style={styles.container}>
      <VerticalSwipe
        items={hours}
        onChange={(item, index) => setHour(item)}
        height={250}
        width={75}
        fontSize={30}
      />

      <Text style={{ marginTop: -2.5, fontSize: 45 }}>:</Text>

      <VerticalSwipe
        items={minutes}
        onChange={(item, index) => setMinutes(item)}
        height={250}
        width={75}
        fontSize={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: vw(60),
  },
});

export default TimePicker;
