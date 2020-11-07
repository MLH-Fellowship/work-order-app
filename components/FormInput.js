import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    overflow: "hidden",
    width: "80%",
    height: "10%",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
});

const FormInput = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor="gray"
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      value={props.value}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines}
    />
  );
};

export default FormInput;
