import * as actionTypes from "./types";
import firebase from '../core/config'
const db = firebase.database();

export const activateModal = (buildingNumber) => ({
    type: actionTypes.MODAL_ACTIVE,
    buildingNumber: buildingNumber
});

export const deactivateModal = () => ({
    type: actionTypes.MODAL_INACTIVE
});

export const getOrders = () => (dispatch) => {
    db.ref("/orders").on("value", (snap) => {
      let data = snap.val() ? snap.val() : {};
      let orders = Object.values(data);
      dispatch({ type: actionTypes.GET_ORDERS, payload: orders });
    });
  };