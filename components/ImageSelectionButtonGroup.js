import React from "react";
import { StyleSheet, View } from "react-native";
import FormButton from "./FormButton";
import * as ImagePicker from "expo-image-picker";
import firebase from "../core/config";
import { theme } from "../core/theme";

const openImagePicker = async (handleImageChange) => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  pickImage(handleImageChange);
};

const openCamera = async (handleImageChange) => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  takePicture(handleImageChange);
};

const takePicture = async (handleImageChange) => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  console.log("Took a picture!", result);

  if (!result.cancelled) {
    handleImageChange(result.uri);
  }
};

const pickImage = async (handleImageChange) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  console.log("picked an Image!", result);

  if (!result.cancelled) {
    handleImageChange(result.uri);
  }
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  button: {
    // TODO: figure out how to set space-betweem
    width: 64,
    height: 64,
    backgroundColor: theme.colors.primary,
  },
})

export const uploadImage = async (path, values) => {
  const response = await fetch(path);
  const blob = await response.blob();
  let reference = firebase
    .storage()
    .ref()
    .child("images/" + buildingNumber + values.room + values.problem);
  let task = reference.put(blob);

  task
    .then(() => {
      console.log("Image uploaded to the bucket!");
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        values.image = downloadURL;
        console.log(values.image);
        addOrders(values)(dispatch);
      });
    })
    .catch((e) => console.log("uploading image error => ", e));
};

const ImageSelectButtonGroup = ({ handleChange, handleChangeProp }) => {
  console.log(handleChange, handleChangeProp);
  return (
    <View style={styles.container}>
      <FormButton
        style={{...styles.button, marginRight: 5}}
        onSubmit={() => openImagePicker(handleChange(handleChangeProp))}
        icon="image"
      />
      <FormButton
        style={styles.button}
        onSubmit={() => openCamera(handleChange(handleChangeProp))}
        icon="camera"
      />
      {/* <FormButton
        style={styles.button}
        onSubmit={() => openCamera(handleChange(handleChangeProp))}
        icon="file-image"
      /> */}
    </View>
  )
}

export default ImageSelectButtonGroup; 