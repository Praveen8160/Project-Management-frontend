import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./AuthReducer.js";

// Combine reducers if you have more than one
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create Redux store with combined reducers and apply middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
