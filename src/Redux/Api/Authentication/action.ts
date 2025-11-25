import { startLoading, stopLoading } from "../../Common/Loading/action";
import { SetSession, SetToken } from "../../../Lib/Session";
import { loginAPI, masterAPI } from "../../../Config/ApiClient";
import { handleApiResponse } from "../../../Lib/ApiUtils";

// Define action types
export const actionTypes = {
  LOGIN: "LOGIN",
  CLEAR_LOGIN: "CLEAR_LOGIN",

  GET_USER: "GET_USER",
  GET_ORG_DETAILS: "GET_ORG_DETAILS",

  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  FORGOT_PASSWORD_CLEAR: "FORGOT_PASSWORD_CLEAR",

  VALIDATE_OTP: "VALIDATE_OTP",
  VALIDATE_OTP_CLEAR: "VALIDATE_OTP_CLEAR",

  RESET_PASSWORD: "RESET_PASSWORD",
  RESET_PASSWORD_CLEAR: "RESET_PASSWORD_CLEAR",
};

// Login action creator
export const LoginAction = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  loginAPI
    .post(`signin`, data)
    .then((response) => {
      const responseData = response?.data;
      if (responseData?.code === 200 && responseData?.status === "Success") {
          SetSession({ username: data.username });
          SetToken(responseData?.data?.accessToken, "local");
      }
      dispatch({
        type: actionTypes.LOGIN,
        payload: responseData,
      });
    })
    .catch((error) => {
      console.error("Login error:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

// Clear login action creator
export const clearLogin = () => ({
  type: actionTypes.CLEAR_LOGIN,
});

export const GetUser = (data: any) => (dispatch: any) => {
  masterAPI
    .get(`user-info/${data}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

// Forgot password action creator
export const ForgotPasswordAction = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  loginAPI
    .put(`forgot_password/${data.email}`)
    .then((response) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.FORGOT_PASSWORD,
        payload: responseData,
      });
    })
    .catch((error) => {
      console.error("Forgot password error:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

// Clear forgot password action creator
export const clearForgotPassword = () => ({
  type: actionTypes.FORGOT_PASSWORD_CLEAR,
});

// Validate OTP action creator
export const ValidateOTP = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  loginAPI
    .post(`validate_reset_otp`, data)
    .then((response) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.VALIDATE_OTP,
        payload: responseData,
      });
    })
    .catch((error) => {
      console.error("Validate OTP error:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

// Clear validate OTP action creator
export const clearValidateOTP = () => ({
  type: actionTypes.VALIDATE_OTP_CLEAR,
});

// Reset password action creator
export const ResetPassword = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  loginAPI
    .put(`reset_password`, data)
    .then((response) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.RESET_PASSWORD,
        payload: responseData,
      });
    })
    .catch((error) => {
      console.error("Reset password error:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

// Clear reset password action creator
export const clearResetPassword = () => ({
  type: actionTypes.RESET_PASSWORD_CLEAR,
});

// export const GetOrgDetails = (data: any) => (dispatch: any) => {
//   masterAPI
//     .get(`organization_profile/${data}`)
//     .then((response) => {
//       dispatch({
//         type: actionTypes.GET_ORG_DETAILS,
//         payload: response.data?.data,
//       });
//     })
//     .catch((error) => {
//       console.error("Error getting data:", error);
//     });
// };
export const GetOrgDetails = (data: any) => (dispatch: any) => {
  masterAPI
    .get(`organization_profile/${data}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_ORG_DETAILS,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};