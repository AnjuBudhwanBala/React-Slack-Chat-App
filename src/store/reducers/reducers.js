import * as actionTypes from "../actionTypes/actionTypes";
import { combineReducers } from "redux";
const initialUserState = {
  currentUser: null,
  isLoading: true
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.user,
        isLoading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        currentUser: null,
        isLoading: false
      };
    default:
      return {
        ...initialUserState,
        isLoading: false
      };
  }
};

const rootReducer = combineReducers({
  user: userReducer
});
export default rootReducer;
