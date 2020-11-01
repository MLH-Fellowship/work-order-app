import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const orderState = {
  orders: [],
};

const modalState = {
  modalActive: false,
  buildingNumber: null
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
      };
    case actionTypes.DEACTIVATE_MODAL:
      return {
        ...state,
        modalActive: false,
        buildingNumber: null
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
        orders: action.payload
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  modalReducer, orderReducer
});

export default rootReducer;
