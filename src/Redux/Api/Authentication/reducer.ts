import { actionTypes } from "./action";

// Define the initial state
const INITIAL_STATE = {
  LoginRes: null,
  GetUserRes: null,
  GetOrgDetailsRes: null,

  ForgotRes: null,
  OtpValidateResponse: null,
  ResetResponse: null,
};

// Reducer function
const LoginReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        LoginRes: action.payload,
      };
    case actionTypes.CLEAR_LOGIN:
      return {
        ...state,
        LoginRes: null,
      };

    case actionTypes.GET_USER:
      return {
        ...state,
        GetUserRes: action.payload,
      };

    case actionTypes.GET_ORG_DETAILS:
      return {
        ...state,
        GetOrgDetailsRes: action.payload,
      };

    // Handle FORGOT_PASSWORD action
    case actionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        ForgotRes: action.payload,
      };

    // Handle FORGOT_PASSWORD_CLEAR action
    case actionTypes.FORGOT_PASSWORD_CLEAR:
      return {
        ...state,
        ForgotRes: null,
      };

    // Handle VALIDATE_OTP action
    case actionTypes.VALIDATE_OTP:
      return {
        ...state,
        OtpValidateResponse: action.payload,
      };

    // Handle VALIDATE_OTP_CLEAR action
    case actionTypes.VALIDATE_OTP_CLEAR:
      return {
        ...state,
        OtpValidateResponse: null,
      };

    // Handle RESET_PASSWORD action
    case actionTypes.RESET_PASSWORD:
      return {
        ...state,
        ResetResponse: action.payload,
      };

    // Handle RESET_PASSWORD_CLEAR action
    case actionTypes.RESET_PASSWORD_CLEAR:
      return {
        ...state,
        ResetResponse: null,
      };
    default:
      return state;
  }
};

export default LoginReducer;
