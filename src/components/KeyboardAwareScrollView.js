import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

const KeyboardAwareScrollView = (props) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      {...props.keyboardAvoidingViewProps}
    >
      <ScrollView
        overScrollMode="never"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...props.scrollViewProps}
      >
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareScrollView;
