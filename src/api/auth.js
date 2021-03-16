import firebase from './firebase'
import { createUserInfo } from '@/api/user';

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const registerUser = async (email, password, data) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    createUserInfo(user.uid, data);
  } catch (e) {
    return {
      message: '',
      error: {
        'auth/email-already-in-use': 'Unable to create account. E-mail already in use.',
        'auth/invalid-email': 'Unable to create account. Invalid e-mail address format.',
        'auth/weak-password': 'Password is too weak.',
        'auth/too-many-requests': 'Unable to create account. Try again in a minute.',
      }[e.code] || 'Unable to create account. Please check your internet connection.'
    }
  }

  return {
    message: 'Verification email sent',
    error: ''
  };

};

export const resetPasswordForUser = async (email) => {
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
      .then(() => {
        return {
          message: 'Email sent',
          error: ''
        };
      })
      .catch((error) => {
        console.log(error.code);
        return {
          message: '',
          error: error.code
        };
      });
}

export const loginUser = async ({ email, password }) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return {
      error: ''
    };
  } catch (error) {
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
