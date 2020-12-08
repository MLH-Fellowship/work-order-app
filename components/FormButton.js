import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: "80%",
    backgroundColor: "#e05e78",
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
  },
});

const FormButton = (props) => (
  <TouchableOpacity style={props.style ? props.style : styles.button} onPress={props.onSubmit}>
    <Text style={styles.buttonText}>{props.text}</Text>
  </TouchableOpacity>
);

export default FormButton;
