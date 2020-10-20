import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: '80%',
    marginBottom: 10,
  }
});

const FormInput = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      placeholderTextColor="gray"
      onChangeText={props.onChangeText}
      value={props.value}
      multiline={props.multiline}
      numberOfLines={props.numberOfLines}
    />
  );
};

export default FormInput;