import * as actionTypes from "./types";
import firebase from "../core/config";
const db = firebase.database();

// Modal Actions
export const activateModal = (building) => ({
  type: actionTypes.ACTIVATE_MODAL,
  buildingNumber: building.number,
  buildingName: building.name,
  buildingCoordinates: building.coordinates
});

export const deactivateModal = () => ({
  type: actionTypes.DEACTIVATE_MODAL,
});

// Order Actions
export const getOrders = () => (dispatch) => {
  db.ref("/orders").on("value", (snap) => {
    let data = snap.val() ? snap.val() : {};
    let orders = Object.values(data);
    dispatch({ type: actionTypes.GET_ORDERS, payload: orders });
  });
};

export const getUserOrders = (user) => (dispatch) => {
  db.ref("/orders").on("value", (snap) => {
    let data = snap.val() ? snap.val() : {};
    let orders = Object.values(data);
    dispatch({ type: actionTypes.GET_USER_ORDERS, payload: orders.filter(order => order.user == user) });
  });
};

export const addOrders = (order) => (dispatch) => {
  dispatch({ type: actionTypes.ADD_ORDERS });
  db.ref("/orders").push(order);
};

export const getDashboardDetailPageName = (buildingName) => ({
  type: actionTypes.GET_DASHBOARD_DETAIL_PAGE_NAME,
  buildingName: buildingName
});