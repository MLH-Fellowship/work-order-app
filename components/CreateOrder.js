import React, { useState } from "react";
import { StyleSheet, 
  View, 
  Text, 
  TextInput } from "react-native";
import FormButton from "./FormButton";
import FormInput from "./FormInput";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "#2BD1FB",
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {

  }
});

const CreateOrder = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <FormInput
        placeholder='Personnel Name'
        onChangeText={text => setText(text)}
      />
      <FormInput
        placeholder='Building #'
      />
      <FormInput
        placeholder='Room #'
      />
      <FormInput
        placeholder='Problem'
      />
      <FormInput
        placeholder='Description'
        multiline='true'
        numberOfLines='2'
      />
      <FormButton
      text='Submit'
      />
    </View>
  );
};
export default CreateOrder;

/*
The work order needs

Name of the user.
Building Number - should be dropdown
Room Name/Number - leave as textfield
Problem: leave as textfield
Description: also leave as textfield.

*/