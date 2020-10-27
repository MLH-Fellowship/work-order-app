import { Formik } from "formik";
import React, {  useState } from "react";
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
    <Formik
      initialValues={{
        name: '',
        building: '',
        room: '',
        problem: '',
        description: ''
      }}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
    <View style={styles.container}>
      <FormInput
        placeholder='Personnel Name'
        onChangeText={handleChange('name')}
        onBlur={handleBlur('name')}
        value={values.name}
      />
      <FormInput
        placeholder='Building #'
        onChangeText={handleChange('building')}
        onBlur={handleBlur('building')}
        value={values.building}
      />
      <FormInput
        placeholder='Room #'
        onChangeText={handleChange('room')}
        onBlur={handleBlur('room')}
        value={values.room}
      />
      <FormInput
        placeholder='Problem'
        onChangeText={handleChange('problem')}
        onBlur={handleBlur('problem')}
        value={values.problem}
      />
      <FormInput
        placeholder='Description'
        multiline='true'
        numberOfLines='2'
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        value={values.description}
      />
      <FormButton
      onSubmit={handleSubmit}
      text='Submit'
      />
    </View>
      )}
    </Formik>
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