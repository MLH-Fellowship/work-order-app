import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const orderState = {
  orders: {},
  userOrders: {},
};

const modalState = {
  modalActive: false,
  buildingNumber: null,
  buildingName: null,
  buildingCoordinates: [],
};

const dashboardDetailState = {
  order: [],
};

const usernameState = {
  username: "",
};

const modalReducer = (state = modalState, action) => {
  switch (action.type) {
    case actionTypes.ACTIVATE_MODAL:
      return {
        ...state,
        modalActive: true,
        buildingNumber: action.buildingNumber,
        buildingName: action.buildingName,
        buildingCoordinates: action.buildingCoordinates,
      };
    case actionTypes.DEACTIVATE_MODAL:
      return {
        ...state,
        modalActive: false,
        buildingNumber: null,
        buildingName: null,
        buildingCoordinates: [],
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
    case actionTypes.UPDATE_ORDERS:
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

const detailReducer = (state = dashboardDetailState, action) => {
  switch (action.type) {
    case actionTypes.GET_DASHBOARD_DETAIL_DATA:
      return {
        ...state,
        order: action.order,
      };

    default:
      return state;
  }
};

const usernameReducer = (state = usernameState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USERNAME:
      return {
        ...state,
        username: action.username,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  modalReducer,
  orderReducer,
  detailReducer,
  usernameReducer,
});

export default rootReducer;
