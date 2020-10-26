import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialState = {
  loading: false,
  error: "",
  orders: [],
};

const modalState = {
  modalActive: false,
  buildingNumber: null
};

const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const modalReducer = (state = modalState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_ACTIVE:
      return {
        ...state,
        modalActive: true,
        buildingNumber: action.buildingNumber,
      };
    case actionTypes.MODAL_INACTIVE:
      return {
        ...state,
        modalActive: false,
        buildingNumber: null
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  state: modalReducer
});

export default rootReducer;
