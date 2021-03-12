import firebase from './firebase'
import { createUserInfo } from '@/api/user';

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const registerUser = async ( email, password, data ) => {
  let user = null;
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log('attempting to add data to db');
    createUserInfo(userCredential.user.uid, data);
  })
  .catch((error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          message: '',
          error: 'Unable to create account. E-mail already in use.'
        };
      case "auth/invalid-email":
        return {
          message: '',
          error: 'Unable to create account. Invalid e-mail address format.'
        };
      case "auth/weak-password":
        return {
          message: '',
          error: 'Password is too weak.'
        };
      case "auth/too-many-requests":
        return {
          message: '',
          error: 'Unable to create account. Try again in a minute.'
        };
      default:
        return {
          message: '',
          error: 'Unable to create account. Please check your internet connection.'
        };
    }
  });

  return {
    message: 'Verification email sent',
    error: ''
  };

};

export const loginUser = async ({ email, password }) => {
  console.log('LOGIN OBJECT', email, password);
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {error: ''};
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case 'auth/invalid-email':
        return {
          error: 'Invalid email address format.',
        };
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return {
          error: 'Invalid email address or password.',
        };
      case 'auth/too-many-requests':
        return {
          error: 'Too many request. Try again in a minute.',
        };
      default:
        return {
          error: 'Check your internet connection.',
        };
    }
  }
};
