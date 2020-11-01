import * as actionTypes from "./types";
import firebase from '../core/config'
const db = firebase.database();

// Modal Actions
export const activateModal = (buildingNumber) => ({
    type: actionTypes.MODAL_ACTIVE,
    buildingNumber: buildingNumber
});

export const deactivateModal = () => ({
    type: actionTypes.MODAL_INACTIVE
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