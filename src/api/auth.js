import firebase from './firebase'
import { createUserInfo, setPhoneNumber, setAltPhoneNumber } from '@/api/user';

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const deleteAccount = (userProvidedPassword) => {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email, 
    userProvidedPassword
  );
  // Now you can use that to reauthenticate
  user.reauthenticateWithCredential(credential)
    .then(() => {
      user.delete()
      .then(() => {
        // User deleted.
      }).catch((error) => {
        // An error happened.
      });
    })
    .catch(() => {

    });
}

export const resetForgottenPassword = () => {
  // check if valid phone number

  const user = firebase.auth().currentUser;
  //resetPasswordForUser(user.email);
}

export const changePrimaryPhone = (phoneNumber) => {
  // check if valid phone number

  const user = firebase.auth().currentUser;

  try {
    setPhoneNumber(user.uid, phoneNumber);
  }
  catch (e) {
    
  }
}

export const changeAlternatePhone = (phoneNumber) => {
  // check if valid phone number

  const user = firebase.auth().currentUser;
  try {
    setAltPhoneNumber(user.uid, phoneNumber);
  }
  catch (e) {

  }
  //
}

export const changePassword = (oldPassword, newPassword) => {
  const user = firebase.auth().currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email, 
    oldPassword
  );
  // Now you can use that to reauthenticate
  user.reauthenticateWithCredential(credential)
    .then(() => {
      user.updatePassword(newPassword)
      .then(() => {
        // Update successful.
      }).catch((error) => {
        // An error happened.
      });
    })
    .catch((error) => {

    });
}

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
