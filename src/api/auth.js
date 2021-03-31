import firebase from "@/api/firebase";
import {setPhoneNumber, setAltPhoneNumber} from "@/api/user"

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const deleteAccount = (userProvidedPassword) => {
  console.log("deleteAccount");
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
      }).catch((e) => {
        return {
          message: '',
          error: 'Unable to delete user'
        }
      });
    })
    .catch((e) => {
      return {
        message: '',
        error: 'Invalid credentials'
      }
    });
}

export const resetForgottenPassword = () => {
  const user = firebase.auth().currentUser;
  //resetPasswordForUser(user.email);

  firebase
    .auth()
    .sendPasswordResetEmail(user.email)
      .then(() => {
        return {
          message: 'Email sent',
          error: ''
        };
      })
      .catch((e) => {
        console.log(error.code);
        return {
          message: '',
          error: error.code
        };
      });
}

export const changePrimaryPhone = (phoneNumber) => {
  // check if valid phone number
  const phoneNumberRegex = /([^0-9])*/g;
  if (!phoneNumber.value || phoneNumber.value.length !== 10 || !phoneNumberRegex.test(phoneNumber.value)) {
    return {
      message: '',
      error: 'Invalid phone number'
    }
  }

  console.log("changePrimaryPhone");
  const user = firebase.auth().currentUser;

  try {
    setPhoneNumber(user.uid, phoneNumber);
    return {
      message: 'Primary phone number successfully changed',
      error: ''
    };
  }
  catch(e) {
    return {
      message: '',
      error: 'Unable to update primary phone number'
    };
  }
  
}

export const changeAlternatePhone = (phoneNumber) => {
  // check if valid phone number
  const phoneNumberRegex = /([^0-9])*/g;
  if (!phoneNumber || phoneNumber.length !== 10 || !phoneNumberRegex.test(phoneNumber)) {
    console.log("!Error");
    return {
      message: '',
      error: 'Invalid phone number'
    }
  }

  console.log("changeAlternatePhone");
  const user = firebase.auth().currentUser;
  
  try {
    setAltPhoneNumber(user.uid, phoneNumber);
    console.log(user.uid + "   " + phoneNumber);
    return {
      message: 'Alternate phone number successfully changed',
      error: ''
    };
  }
  catch(e) {
    console.log("Error");
    return {
      message: '',
      error: 'Unable to update alternate phone number'
    };
  }
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
        return {
          message: 'Password successfully updated',
          error: ''
        }
      }).catch((e) => {
        return {
          message: '',
          error: 'Unable to update password'
        }
      });
    })
    .catch((e) => {
      return {
        message: '',
        error: 'Invalid credentials'
      }
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
