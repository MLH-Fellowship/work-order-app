import firebase from "firebase/app";
import "firebase/auth";

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const registerUser = async ({ name, email, password }) => {

  await firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    //console.log('supposedly sent');
    //handleStatusMessage(AUTH_SUCCESS) //Show success message
    //firebase.auth().signOut()
    //console.log('supposedly signed out');

    console.log('user successfully created!')
  })
  .catch((error) => {
    //console.log('Error was caught while registering!')
    //console.log(error);
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "E-mail already in use."
        };
      case "auth/invalid-email":
        return {
          error: "Invalid e-mail address format."
        };
      case "auth/weak-password":
        return {
          error: "Password is too weak."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  });

  //firebase.auth().onAuthStateChanged((user) => {
  //  console.log(user);
    //if(user.emailVerified) {
    //  console.log('email is verified');
    //}
    //else {
    //  user.sendEmailVerification().then(function() {
    //    console.log('issue verification email');
    //  }).catch((error) => {
    //    console.log(error);
    //  });
    //}
  //});

  /*
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    //firebase.auth().currentUser.updateProfile({
    //  displayName: name
    //});

    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "E-mail already in use."
        };
      case "auth/invalid-email":
        return {
          error: "Invalid e-mail address format."
        };
      case "auth/weak-password":
        return {
          error: "Password is too weak."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }*/
};

export const loginUser = async ({ email, password }) => {
  console.log("LOGIN OBJECT", email, password)
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch (error) {
    console.log(error)
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Invalid email address format."
        };
      case "auth/user-not-found":
      case "auth/wrong-password":
        return {
          error: "Invalid email address or password."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};