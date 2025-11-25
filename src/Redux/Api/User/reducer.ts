import { actionTypes } from "./action";

// Define the initial state
const INITIAL_STATE = {
  AddUserRes: null,
  EditUserRes: null,
  DeleteUserRes: null,
  GetUserRes: null,
  GetUserByIdRes:null,
  GetUserPageRes: null,
  UpdateUserStatusRes: null,

};

// Reducer function
const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        AddUserRes: action.payload,
      };
    case actionTypes.ADD_USER_CLEAR:
      return {
        ...state,
        AddUserRes: null,
      };
    case actionTypes.EDIT_USER:
      return {
        ...state,
        EditUserRes: action.payload,
      };
    case actionTypes.EDIT_USER_CLEAR:
      return {
        ...state,
        EditUserRes: null,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        DeleteUserRes: action.payload,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        GetUserRes: action.payload,
      };
    case actionTypes.GET_USER_BY_ID:
      return {
        ...state,
        GetUserByIdRes: action.payload,
      };
    case actionTypes.GET_USER_PAGE:
      return {
        ...state,
        GetUserPageRes: action.payload,
      };
    case actionTypes.UPDATE_USER_STATUS:
      return {
        ...state,
        UpdateUserStatusRes: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
