import { Formik } from "formik";
import React from "react";
import { StyleSheet, View, Image, Button } from "react-native";
import { useDispatch } from "react-redux";
import { addOrders } from "../actions/index";
import FormButton from "./FormButton";
import FormInput from "./FormInput";
import { deactivateModal } from "../actions/index";
import {theme} from "../core/theme";
import * as ImagePicker from 'expo-image-picker';

import firebase from "../core/config";

const styles = StyleSheet.create({
  container: {

    width: "100%",
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'stretch',
  },
  button: {
    width: "80%",
    backgroundColor: "blue",
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

const CreateOrder = ({buildingNumber, buildingCoordinates}) => {
  const dispatch = useDispatch();

  const openImagePicker = async(uri) => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if(permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    pickImage(uri)
  }
  
  const pickImage = async(handleChange) => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    console.log("picked an Image", result)

    if (!result.cancelled) {
      handleChange(result.uri);
    }
  };

  const uploadImage = (path, values) => {
    let reference = firebase.storage().ref(values.buildingNumber+values.room+values.problem);
    let task = reference.put(path);

    task.then(() => {
      console.log('Image uploaded to the bucket!');
      task.snapshot.ref.getDownloadURL().then( function(downloadURL) {
        values.image = downloadURL;
        console.log(values.image)
        addOrders(values)(dispatch)
      })
    }).catch((e) => console.log('uploading image error => ', e));
  };

  return (
    <Formik
      initialValues={{
        user: "testuser",
        building: buildingNumber,
        room: "",
        problem: "",
        description: "",
        image: null,
        coordinates: buildingCoordinates
      }}
      // TODO: Add validation schema
      onSubmit={(values) => {
        console.log(values);
        if (values.image != null) {
          let image = values.image
          uploadImage(image, values)
          //TODO: Minimize problem name
        } else {
          addOrders(values)(dispatch);
        }
        dispatch(deactivateModal())
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <FormInput
            placeholder=" Room #"
            onChangeText={handleChange("room")}
            onBlur={handleBlur("room")}
            value={values.room}
          />
          <FormInput
            placeholder=" Problem"
            onChangeText={handleChange("problem")}
            onBlur={handleBlur("problem")}
            value={values.problem}
          />
          <FormInput
            placeholder=" Description"
            multiline={true}
            numberOfLines={2}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
          />
          <FormButton
            style={styles.button}
            text="Pick an image from camera roll" 
            onSubmit={() => openImagePicker(handleChange("image"))} 
          />
          {values.image && <Image 
            style={styles.image}
            backgroundColor='#f0f'
            source={{
              uri: values.image
            }}
          /> }
          <FormButton onSubmit={handleSubmit} text="Submit" />
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
