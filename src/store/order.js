import firebase from "@/api/firebase";
import { uploadImage } from "@/api/storage";


const INITIAL_STATE = {
  orders: {},
  userOrders: {},
};

// Order Actions
const GET_ORDERS = 'GET_ORDERS';
const GET_USER_ORDERS = 'GET_USER_ORDERS';
const ADD_ORDERS = 'ADD_ORDERS';
const UPDATE_ORDERS = 'UPDATE_ORDERS';

// START: ACTIONS
export const getOrders = () => (dispatch) => {
  firebase
    .database()
    .ref('/orders')
    .on('value', (snap) => {
    const data = snap.val() ? snap.val() : {};
    dispatch({ type: GET_ORDERS, payload: data });
  });
};

export const getUserOrders = (user) => (dispatch) => {
  firebase
    .database()
    .ref('/orders')
    .on('value', (snap) => {
    const data = snap.val() ? snap.val() : {};
    console.log(data);
    // let orders = Object.values(data);

    dispatch({
      type: GET_USER_ORDERS,
      payload: data,
      // payload: orders.filter(
      //   (order) => order.user == user && order.complete == false
      // ),
    });
  });
};

export const updateOrders = (order) => {
  firebase
    .database()
    .ref('/orders')
    .child(order.id)
    .set(order)
};

export const addOrders = (order) => async (dispatch) => {
  dispatch({ type: ADD_ORDERS });
  const image = order.image !== null ? await uploadImage(order.image, uuidv4()) : null;
  firebase
    .database()
    .ref('/orders')
    .push({
    ...order,
    image,
    issue_opened_on: firebase.database.ServerValue.TIMESTAMP,
  });
};
// END: ACTIONS

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case UPDATE_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;