import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
  },
});

const FormButton = (props) => (
  <TouchableOpacity style={{...styles.button, ...(props.style || {})}} onPress={props.onSubmit}>
    {
      props.icon && <Icon size={20} name={props.icon} color={theme.colors.accent}></Icon>
    }
    {
      props.text && <Text style={styles.buttonText}>{props.text}</Text>
    }
  </TouchableOpacity>
);

export default FormButton;
