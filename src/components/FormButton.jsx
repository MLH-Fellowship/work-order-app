import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

const FormButton = (props) => (
  <TouchableOpacity style={{ ...styles.button, ...(props.style || {}) }} onPress={props.onSubmit}>
    {
      props.icon && <Icon size={20} name={props.icon} />
    }
    {
      props.text && <Text style={styles.buttonText}>{props.text}</Text>
    }
  </TouchableOpacity>
);

export default FormButton;
