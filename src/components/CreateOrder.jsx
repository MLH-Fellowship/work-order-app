import { Formik } from 'formik';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addOrders } from '@/store/order';
import FormButton from './FormButton';
import FormInput from './FormInput';

import theme from 'theme';
import ImageSelectButtonGroup from './ImageSelectionButtonGroup';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionTextbox: {
    height: 80,
  },
  buttonGroupParanet: {
    width: '100%',
    flexDirection: 'row',
  },
  submitButton: {
    height: 64,
    width: null,
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 6,
    backgroundColor: theme.brandSuccess,
  },
});

const CreateOrder = ({ onSubmit, building }) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  return (
    <Formik
      initialValues={{
        room: '',
        problem: '',
        description: '',
        image: null,
      }}
      onSubmit={(values) => {
        // TODO: Add validation schema?
        // TODO: maybe add some loading?
        addOrders({
          ...values,
          user: userReducer.username,
          building: building.number,
          coordinates: building.coordinates,
        })(dispatch);
        onSubmit()
      }}
    >
      {({
        handleChange, handleBlur, handleSubmit, values,
      }) => {
        const { ImagePreview, ButtonGroup } = ImageSelectButtonGroup({
          form: values,
          onChange: handleChange,
          formProp: 'image',
        });
        return (
          <View style={styles.container}>
            <FormInput
              placeholder="Room #"
              onChangeText={handleChange('room')}
              onBlur={handleBlur('room')}
              value={values.room}
            />
            <FormInput
              placeholder="Problem"
              onChangeText={handleChange('problem')}
              onBlur={handleBlur('problem')}
              value={values.problem}
            />
            <FormInput
              placeholder="Description"
              multiline
              style={styles.descriptionTextbox}
              numberOfLines={4}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />

            <ImagePreview />

            <View style={styles.buttonGroupParanet}>
              <ButtonGroup />
              <FormButton onSubmit={handleSubmit} style={styles.submitButton} text="Submit" />
            </View>

          </View>
        );
      }}
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
