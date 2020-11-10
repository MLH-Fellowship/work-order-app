import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const orderState = {
  orders: [],
  userOrders: [],
};

const modalState = {
  modalActive: false,
  buildingNumber: null,
  buildingName: null,
};

// const initialReducer = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

const modalReducer = (state = modalState, action) => {
  switch (action.type) {
    case actionTypes.ACTIVATE_MODAL:
      return {
        ...state,
        modalActive: true,
        buildingNumber: action.buildingNumber,
        buildingName: action.buildingName,
      };
    case actionTypes.DEACTIVATE_MODAL:
      return {
        ...state,
        modalActive: false,
        buildingNumber: null,
        buildingName: null,
      };
    default:
      return state;
  }
};

const orderReducer = (state = orderState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  modalReducer,
  orderReducer,
});

export default rootReducer;
