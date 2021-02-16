import { Formik } from "formik";

import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { useDispatch } from "react-redux";
import { addOrders } from "../actions/index";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { deactivateModal } from "../actions/index";
import { theme } from "../core/theme";
import ImageSelectButtonGroup, { uploadImage }  from "./ImageSelectionButtonGroup";


const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: theme.colors.accent,
    alignSelf: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    backgroundColor: theme.colors.disabled,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 300
  },
  image: { flex: 1, resizeMode: 'stretch'},
  submitButton: {
    height: 64,
    width: null,
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 6,
    backgroundColor: theme.colors.success,
  },
  buttonText: {
    color: "#fff",
  },
});

const CreateOrder = ({ buildingNumber, buildingCoordinates }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        user: "testuser",
        building: buildingNumber,
        room: "",
        problem: "",
        description: "",
        // image: 'file:///Users/vulcan/Library/Developer/CoreSimulator/Devices/F1C8E25E-E8E4-4ADE-BEBD-93534275204F/data/Containers/Data/Application/336D36DD-1E9A-45AD-A425-3695A8435367/Library/Caches/ExponentExperienceData/%2540anonymous%252FWork-Order-App-e54eeff5-86be-423f-b214-72a9dda0c9f7/ImagePicker/ECD67417-000E-4B25-B715-4E79C4F2A745.jpg',
        image: null,
        coordinates: buildingCoordinates,
        complete: false,
      }}
      // TODO: Add validation schema
      onSubmit={(values) => {
        if (values.image != null) {
          let image = values.image;
          uploadImage(image, values);
          //TODO: Minimize problem name
        } else {
          addOrders(values)(dispatch);
        }
        dispatch(deactivateModal());
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <FormInput
            placeholder="Room #"
            onChangeText={handleChange("room")}
            onBlur={handleBlur("room")}
            value={values.room}
          />
          <FormInput
            placeholder="Problem"
            onChangeText={handleChange("problem")}
            onBlur={handleBlur("problem")}
            value={values.problem}
          />
          <FormInput
            placeholder="Description"
            multiline={true}
            style={{height: 64}}
            numberOfLines={2}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
          />
          
          <View style={styles.imageContainer}>
            {values.image ? (
              <Image
                style={styles.image}
                source={{
                  uri: values.image,
                }}
              />
            ) : (
                <Text style={styles.imagePlaceholderText}>No image selected</Text>
              )}
            </View>
          
          <View style={{
            width: '100%',
            flexDirection: 'row',
          }}>
            <ImageSelectButtonGroup handleChange={handleChange} handleChangeProp="image"></ImageSelectButtonGroup>
            <FormButton onSubmit={handleSubmit} style={styles.submitButton} text="Submit" />
          </View>
          
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
