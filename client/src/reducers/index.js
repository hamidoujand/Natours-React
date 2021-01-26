import { combineReducers } from "redux";
import toursReducer from "./toursReducer";
import authReducer from "./authReducer";
let rootReducer = combineReducers({
  toursState: toursReducer,
  authState: authReducer,
});

export default rootReducer;
