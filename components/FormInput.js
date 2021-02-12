import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    overflow: "hidden",
    width: "80%",
    height: 32,
    padding: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
});

const FormInput = ({
  style = {},
  placeholder,
  onChangeText,
  onBlur,
  value,
  multiline,
  numberOfLines
}) => {
  return (
    <TextInput
      style={StyleSheet.compose(styles.input, style)}
      placeholder={placeholder}
      placeholderTextColor="gray"
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

export default FormInput;
