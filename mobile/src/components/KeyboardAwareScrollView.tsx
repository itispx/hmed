import React from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ScrollView,
  ScrollViewProps,
} from "react-native";

interface Props {
  keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
  scrollViewProps?: ScrollViewProps;
  children: React.ReactNode;
}

const KeyboardAwareScrollView: React.FC<Props> = ({
  keyboardAvoidingViewProps,
  scrollViewProps,
  children,
}) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} {...keyboardAvoidingViewProps}>
      <ScrollView
        overScrollMode="never"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareScrollView;
