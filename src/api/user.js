import firebase from "@/api/firebase";

export const createUserInfo = (userId, data) => {
  // WARN: outer mem access
  // data['verificationSent'] = Date.now();
  console.log("createUserInfo");
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
    .update({'phoneNumber' : newPhoneNumber});
}

export const setAltPhoneNumber = (userId, newPhoneNumber) => {
  firebase
    .database()
    .ref('/users')
    .child(userId)
    .update({'altPhoneNumber' : newPhoneNumber});
}
