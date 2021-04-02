import { combineReducers } from 'redux';
import userReducer from "./user";
import orderReducer from "./order";
import dashboardReducer from "./dashboard";

const rootReducer = combineReducers({
  orderReducer,
  dashboardReducer,
  userReducer,
});

export default rootReducer;
