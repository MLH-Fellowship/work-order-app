import firebase from "@/api/firebase";

export const createUserInfo = (userId, data) => {
  // WARN: outer mem access
  data['verificationSent'] = Date.now();
  firebase
    .database()
    .ref('/users')
    .child(userId)
    .set(data)
}