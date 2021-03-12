import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { View, Text } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import FormButton from './FormButton';
import theme from '../native-base-theme/variables/commonColor';

const pickImage = async (handleImageChange) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.cancelled) {
    handleImageChange(result.uri);
  }
};

const openImagePicker = async (handleImageChange) => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }

  pickImage(handleImageChange);
};

const takePicture = async (handleImageChange) => {
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  console.log('Took a picture!', result);

  if (!result.cancelled) {
    handleImageChange(result.uri);
  }
};

const openCamera = async (handleImageChange) => {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }

  takePicture(handleImageChange);
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    width: 64,
    height: 64,
    backgroundColor: theme.brandPrimary,
  },
  imagePlaceholderText: {
    fontSize: 16,
    alignSelf: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    backgroundColor: theme.brandDisabled,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    height: 300,
  },
  image: { flex: 1, resizeMode: 'stretch' },
});

const ImageSelectButtonGroup = ({ form, formProp, onChange }) => ({
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
        style={{ ...styles.button, marginRight: 5 }}
        onSubmit={() => openImagePicker(onChange(formProp))}
        icon="image"
      />
      <FormButton
        style={styles.button}
        onSubmit={() => openCamera(onChange(formProp))}
        icon="camera"
      />
    </View>
  ),
});

export default ImageSelectButtonGroup;
