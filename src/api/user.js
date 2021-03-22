import firebase from "@/api/firebase";

export const createUserInfo = (userId, data) => {
  // WARN: outer mem access
  // data['verificationSent'] = Date.now();
  firebase
    .database()
    .ref('/users')
    .child(userId)
    .set(data)
}

export const setPhoneNumber = (userId, newPhoneNumber) => {
  firebase
    .database()
    .ref('/users')
    .child(userId)
    .set({'phoneNumber' : newPhoneNumber});
}

export const setAltPhoneNumber = (userId, newPhoneNumber) => {
  firebase
    .database()
    .ref('/users')
    .child(userId)
    .set({'altPhoneNumber' : newPhoneNumber});
}

export const getUserInfo = () => {
  const currentUser = firebase.auth().currentUser;
  //console.log(currentUser.uid);
  let result = {}
  firebase.database().ref('/users')
    .child(currentUser.uid).on('value', (snap) => {
      const data = snap.val() ? snap.val() : {};
      
      console.log(data);
      const temp = {
        ...data,
        email : currentUser.email,
      };
      console.log(temp);
      result = temp;
      //return {
      //  ...data,
      //  'email' : currentUser.email,
      //};
      // let orders = Object.values(data);

  });
  //console.log(temp);
  //console.log(firebase.auth().currentUser);
  return result;
}