import * as actionTypes from "./types";
import firebase from "../core/config";
const db = firebase.database();

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
  db.ref("/orders").on("value", (snap) => {
    let data = snap.val() ? snap.val() : {};
    dispatch({ type: actionTypes.GET_ORDERS, payload: data });
  });
};

export const getUserOrders = (user) => (dispatch) => {
  db.ref("/orders").on("value", (snap) => {
    let data = snap.val() ? snap.val() : {};
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

export const updateOrders = (orderName) => (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: actionTypes.UPDATE_ORDERS, payload: data });
  db.ref("/orders").child(orderName).set(data);
};

export const addOrders = (order) => (dispatch) => {
  dispatch({ type: actionTypes.ADD_ORDERS });
  db.ref("/orders").push(order);
};

export const getDashboardDetailData = (order) => ({
  type: actionTypes.GET_DASHBOARD_DETAIL_DATA,
  order: order,
});

export const setCurrentUser = (username) => (dispatch) => {
  dispatch({ type: actionTypes.SET_CURRENT_USER, username: username });
};
