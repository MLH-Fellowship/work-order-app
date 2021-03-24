import { combineReducers } from 'redux';
import modalReducer from "./modal";
import userReducer from "./user";
import orderReducer from "./order";
import dashboardReducer from "./dashboard";

const rootReducer = combineReducers({
  modalReducer,
  orderReducer,
  dashboardReducer,
  userReducer,
});

export default rootReducer;
