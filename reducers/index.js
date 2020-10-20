import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialState = {
  loading: false,
  error: "",
  orders: [],
};

const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  state: initialReducer,
});

export default rootReducer;