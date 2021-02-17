import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
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
    flexDirection: 'row',
  },
  button: {
    width: 64,
    height: 64,
    backgroundColor: theme.colors.primary,
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

const ImageSelectButtonGroup = ({ form, formProp, onChange,  }) => {
  return {
    ImagePreview: () => (
      <View style={styles.imageContainer}>
        {form[formProp] ? (
          <Image
            style={styles.image}
            source={{
              uri: form[formProp],
            }}
          />
        ) : (
            <Text style={styles.imagePlaceholderText}>No image selected</Text>
          )}
      </View>
    ),
    ButtonGroup: () => (
      <View style={styles.container}>
        <FormButton
          style={{...styles.button, marginRight: 5}}
          onSubmit={() => openImagePicker(onChange(formProp))}
          icon="image"
        />
        <FormButton
          style={styles.button}
          onSubmit={() => openCamera(onChange(formProp))}
          icon="camera"
        />
    </View>
    )
  }
}

export default ImageSelectButtonGroup; 