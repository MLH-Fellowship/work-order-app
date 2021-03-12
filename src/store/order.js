const INITIAL_STATE = {
  orders: {},
  userOrders: {},
};

// Order Actions
const GET_ORDERS = 'GET_ORDERS';
const GET_USER_ORDERS = 'GET_USER_ORDERS';
const ADD_ORDERS = 'ADD_ORDERS';
const UPDATE_ORDERS = 'UPDATE_ORDERS';

export const types = {
  GET_ORDERS,
  GET_USER_ORDERS,
  ADD_ORDERS,
  UPDATE_ORDERS,
}

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