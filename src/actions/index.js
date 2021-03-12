import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './types';
import firebase from '../core/config';

export const db = firebase.database();

// Modal Actions
export const activateModal = (building) => ({
  type: actionTypes.ACTIVATE_MODAL,
  buildingNumber: building.number,
  buildingName: building.name,
  buildingCoordinates: building.coordinates,
});

export const deactivateModal = () => ({
  type: actionTypes.DEACTIVATE_MODAL,
});

// Order Actions
export const getOrders = () => (dispatch) => {
  db.ref('/orders').on('value', (snap) => {
    const data = snap.val() ? snap.val() : {};
    dispatch({ type: actionTypes.GET_ORDERS, payload: data });
  });
};

export const getUserOrders = (user) => (dispatch) => {
  db.ref('/orders').on('value', (snap) => {
    const data = snap.val() ? snap.val() : {};
    console.log(data);
    // let orders = Object.values(data);

    dispatch({
      type: actionTypes.GET_USER_ORDERS,
      payload: data,
      // payload: orders.filter(
      //   (order) => order.user == user && order.complete == false
      // ),
    });
  });
};

export const updateOrders = (orderName) => (data) => {
  console.log(data);
  //dispatch({ type: actionTypes.UPDATE_ORDERS, payload: data });
  db.ref('/orders').child(orderName).set(data);
};

export const createUserInfo = (userId, data) => {
  data['verificationSent'] = Date.now();
  console.log(data);
  db.ref('/users').child(userId).set(data)
  .then(() => console.log('success'))
  .catch((error) => console.log(error));
  //db.ref('/users').set({userId});
}

const uploadImage = async (imagePath, imageRef) => {
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

export const addOrders = (order) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_ORDERS });
  const image = order.image !== null ? await uploadImage(order.image, uuidv4()) : null;
  db.ref('/orders').push({
    ...order,
    image,
    issue_opened_on: firebase.database.ServerValue.TIMESTAMP,
  });
};

export const getDashboardDetailData = (order) => ({
  type: actionTypes.GET_DASHBOARD_DETAIL_DATA,
  order,
});

export const setCurrentUser = (username) => (dispatch) => {
  db.ref('/users')
    .child(username)
    .on('value', (snap) => {
      const data = snap.val() || { role: 'admin' };
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        username,
        role: data.role,
      });
    });
};
