import { Formik } from "formik";

import React from "react";
import { StyleSheet, View, Image } from "react-native";
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
  image: {
    height: 100,
    width: 100,
    resizeMode: "stretch",
  },
  submitButton: {
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
          <ImageSelectButtonGroup handleChange={handleChange}></ImageSelectButtonGroup>
          { // TODO: try to fit this image display into ImageSelectButtonGroup
            values.image && (
            <Image
              style={styles.image}
              backgroundColor="#f0f"
              source={{
                uri: values.image,
              }}
            />
          )}
          <FormButton onSubmit={handleSubmit} style={styles.submitButton} text="Submit" />
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
