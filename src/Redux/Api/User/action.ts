import { startLoading, stopLoading } from "../../Common/Loading/action";
import  { masterAPI } from "../../../Config/ApiClient";
import { handleApiResponse } from "../../../Lib/ApiUtils";
// Define action types
export const actionTypes = {
  ADD_USER: "ADD_USER",
  ADD_USER_CLEAR: "ADD_USER_CLEAR",
  EDIT_USER: "EDIT_USER",
  EDIT_USER_CLEAR: "EDIT_USER_CLEAR",
  GET_USER: "GET_USER",
  GET_USER_BY_ID: "GET_USER_BY_ID",
  GET_USER_PAGE: "GET_USER_PAGE",
  DELETE_USER: "DELETE_USER",
  UPDATE_USER_STATUS: "UPDATE_USER_STATUS",
};

// User actions
export const AddUser = (data) => (dispatch) => {
  dispatch(startLoading());
  masterAPI.post(`add-user`, data)
    .then((response) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.ADD_USER,
        payload: responseData,
      });
    })
    .catch((error) => {
      console.error("Error adding label:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const AddUserClear = () => ({
  type: actionTypes.ADD_USER_CLEAR,
});

export const EditUser = (data) => (dispatch) => {
  dispatch(startLoading());
  masterAPI.put(`user-profile/${data.id}`, data)
    .then((response) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.EDIT_USER,
        payload: responseData,
      });
    })
    .catch((error) => {
      console.error("Error editing label:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const EditUserClear = () => ({
  type: actionTypes.EDIT_USER_CLEAR,
});

export const GetUser = (data) => (dispatch) => {
  masterAPI.get(`users/org/${data.orgId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting label:", error);
    });
};

export const GetUserById = (data) => (dispatch) => {
  masterAPI.get(`user-profile/${data.id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER_BY_ID,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting label:", error);
    });
};

export const GetUserPage = (data) => (dispatch) => {
  masterAPI.get(
    `user/filter?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=10&sort=id,desc&searchText=${data.searchText}&department=${data.department}&designation=${data.designation}`
  )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER_PAGE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
};

export const DeleteUser = (data) => (dispatch) => {
  dispatch(startLoading());
  masterAPI.delete(`user-delete/${data.id}/${data.userId}`)
    .then((response) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.DELETE_USER,
        payload: responseData,
      });
    })
    .catch((error) => {
      console.error("Error deleting label:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const UpadetUserStatus = (data) => (dispatch) => {
  dispatch(startLoading());
  masterAPI.put(`user-status/${data.id}`, data)
    .then((response) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.UPDATE_USER_STATUS,
        payload: responseData,
      });
    })
    .catch((error) => {
      console.error("Error deleting label:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

