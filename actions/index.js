import * as actionTypes from "./types";
import firebase from '../core/config'
const db = firebase.database();

// Modal Actions
export const activateModal = (buildingNumber) => ({
    type: actionTypes.ACTIVATE_MODAL,
    buildingNumber: buildingNumber
});

export const deactivateModal = () => ({
    type: actionTypes.DEACTIVATE_MODAL
});


// Order Actions
export const getOrders = () => (dispatch) => {
    db.ref("/orders").on("value", (snap) => {
      let data = snap.val() ? snap.val() : {};
      let orders = Object.values(data);
      dispatch({ type: actionTypes.GET_ORDERS, payload: orders });
    });
  };

  export const addOrders = (order) => (dispatch) => {
    dispatch({ type: actionTypes.ADD_ORDERS });
    db.ref("/orders").push(order);
  };