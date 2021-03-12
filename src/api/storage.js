import firebase from './firebase'

export const uploadImage = async (imagePath, imageRef) => {
  const response = await fetch(imagePath);
  const blob = await response.blob();
  const reference = firebase
    .storage()
    .ref()
    .child(`images/${imageRef}`);
  const imageUpload = await reference.put(blob);
  const imageUrl = await imageUpload.ref.getDownloadURL();
  return imageUrl;
};