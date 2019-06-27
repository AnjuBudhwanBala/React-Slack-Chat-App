import * as actionTypes from "../actionTypes/actionTypes";
import { combineReducers } from "redux";

//User Reducer
const initialUserState = {
  currentUser: null,
  isLoading: true
};

const userReducer = (state = initialUserState, actions) => {
  switch (actions.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: actions.currentUser,
        isLoading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        currentUser: null,
        isLoading: false
      };
    default:
      return {
        ...state,
        isLoading: false
      };
  }
};

//channel Reducer
const initialChannelState = {
  currentChannel: null
};
const channelReducer = (state = initialChannelState, actions) => {
  switch (actions.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: actions.currentChannel
      };
    // case actionTypes.SET_FIRST_CHANNEL:
    //   return {
    //     ...state,
    //     firstChannel: actions.firstChannel
    //   };
    default:
      return state;
  }
};

//combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer
});

export default rootReducer;
