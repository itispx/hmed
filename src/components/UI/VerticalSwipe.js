import React, { useRef } from "react";

import { StyleSheet, View, Text, FlatList } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const ListItem = React.memo(({ label, style, fontSize }) => (
  <View style={style}>
    <Text style={{ fontSize }}>{label}</Text>
  </View>
));

const VerticalSwipe = ({
  items,
  onChange,
  initialSelectedIndex = null,
  width,
  height,
  fontSize = 18,
}) => {
  let itemHeight = 40;
  let listHeight = 200;

  if (height) {
    listHeight = height;
    itemHeight = listHeight / 5;
  }

  let pickerGradientHeight = itemHeight * 2;

  const flatList = useRef(null);

  let extendedItems = ["", "", ...items, "", ""];

  const onEndReachedCalledDuringMomentum = useRef(true);

  return (
    <View style={{ height: listHeight, width: width }}>
      <FlatList
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onMomentumScrollEnd={(event) => {
          if (!onEndReachedCalledDuringMomentum.current) {
            onEndReachedCalledDuringMomentum.current = true;
            let index = Math.round(
              event.nativeEvent.contentOffset.y / itemHeight
            );
            onChange({ item: items[index], index });
          }
        }}
        initialScrollIndex={initialSelectedIndex}
        ref={flatList}
        data={extendedItems.map((item, index) => ({
          key: index,
          item,
        }))}
        renderItem={(item) => (
          <ListItem
            label={item.item.item}
            style={[styles.listItem, { height: itemHeight }]}
            fontSize={fontSize}
          />
        )}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: index * itemHeight,
          index,
        })}
        snapToInterval={itemHeight}
        ListEmptyComponent={() => <Text>No Items</Text>}
      />
      <LinearGradient
        colors={[
          "rgba( 255, 255, 255, 1 )",
          "rgba( 255, 255, 255, 0.9 )",
          "rgba( 255, 255, 255, 0.7 )",
          "rgba( 255, 255, 255, 0.5 )",
        ]}
        style={[
          styles.pickerGradient,
          { height: pickerGradientHeight, top: 0 },
        ]}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[
          "rgba( 255, 255, 255, 0.5 )",
          "rgba( 255, 255, 255, 0.7 )",
          "rgba( 255, 255, 255, 0.9 )",
          "rgba( 255, 255, 255, 1 )",
        ]}
        style={[
          styles.pickerGradient,
          { height: pickerGradientHeight, bottom: 0 },
        ]}
        pointerEvents="none"
      />
    </View>
  );
};

export default VerticalSwipe;

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  pickerGradient: {
    position: "absolute",
    width: "100%",
  },
});
