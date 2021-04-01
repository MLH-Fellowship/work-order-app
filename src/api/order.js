import firebase from "@/api/firebase";

export const setOrderTechnician = (orderId, { name, id }) => {
  firebase
    .database()
    .ref('/orders')
    .child(orderId)
    .update({
      technician: {
        name,
        id
    } })
}