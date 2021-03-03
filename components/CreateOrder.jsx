import { Formik } from 'formik';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addOrders, deactivateModal } from '../actions/index';
import FormButton from './FormButton';
import FormInput from './FormInput';

import theme from '../native-base-theme/variables/commonColor';
import ImageSelectButtonGroup, { uploadImage } from './ImageSelectionButtonGroup';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionTextbox: {
    height: 64,
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

const CreateOrder = ({ buildingNumber, buildingCoordinates }) => {
  const dispatch = useDispatch();

  if (!buildingNumber) {
    return (
      <Formik
        initialValues={{
          user: 'testuser',
          problem: '',
          description: '',
          image: null,
          coordinates: buildingCoordinates,
          complete: false,
        }}
        // TODO: Add validation schema
        onSubmit={(values) => {
          if (values.image != null) {
            const { image } = values;
            uploadImage(image, values);
            // TODO: Minimize problem name
          } else {
            addOrders(values)(dispatch);
          }
          dispatch(deactivateModal());
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
                placeholder="Problem"
                onChangeText={handleChange('problem')}
                onBlur={handleBlur('problem')}
                value={values.problem}
              />
              <FormInput
                placeholder="Description"
                multiline
                style={styles.descriptionTextbox}
                numberOfLines={2}
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
  }

  return (
    <Formik
      initialValues={{
        user: 'testuser',
        building: buildingNumber,
        room: '',
        problem: '',
        description: '',
        image: null,
        coordinates: buildingCoordinates,
        complete: false,
      }}
        // TODO: Add validation schema
      onSubmit={(values) => {
        if (values.image != null) {
          const { image } = values;
          uploadImage(image, values);
          // TODO: Minimize problem name
        } else {
          addOrders(values)(dispatch);
        }
        dispatch(deactivateModal());
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
              numberOfLines={2}
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
