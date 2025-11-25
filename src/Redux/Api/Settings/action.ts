import { startLoading, stopLoading } from "../../Common/Loading/action";

import { handleApiResponse } from "../../../Lib/ApiUtils";
import { masterAPI } from "../../../Config/ApiClient";

export const actionTypes = {
  //Service
  ADD_SERVICE_FIELD: "ADD_SERVICE_FIELD",
  ADD_SERVICE_FIELD_CLEAR: "ADD_SERVICE_FIELD_CLEAR",

  EDIT_SERVICE_FIELD: "EDIT_SERVICE_FIELD",
  EDIT_SERVICE_FIELD_CLEAR: "EDIT_SERVICE_FIELD_CLEAR",

  GET_SERVICE_FIELD: "GET_SERVICE_FIELD",
  GET_SERVICE_FIELD_LIST: "GET_SERVICE_FIELD_LIST",

  DELETE_SERVICE_FIELD: "DELETE_SERVICE_FIELD",

  //GST
  ADD_GST: "ADD_GST",
  ADD_GST_CLEAR: "ADD_GST_CLEAR",

  EDIT_GST: "EDIT_GST",
  EDIT_GST_CLEAR: "EDIT_GST_CLEAR",

  GET_GST: "GET_GST",
  GET_GST_LIST: "GET_GST_LIST",
  
  DELETE_GST: "DELETE_GST",
};

//SERVICE FIELD APIS
export const AddServiceField = (formData: FormData) => (dispatch: any) => {
  dispatch(startLoading());
  masterAPI
    .post(`service/add-with-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.ADD_SERVICE_FIELD,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error adding Service:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearAddServiceField = () => ({
  type: actionTypes.ADD_SERVICE_FIELD_CLEAR,
});

export const EditServiceField = (formData: FormData) => (dispatch: any) => {
  dispatch(startLoading());
  masterAPI
    .put(`service/edit-with-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.EDIT_SERVICE_FIELD,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error editing Service:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearEditServiceField = () => ({
  type: actionTypes.EDIT_SERVICE_FIELD_CLEAR,
});

export const GetServiceField = (data: any) => (dispatch: any) => {
  masterAPI
    .get(
      `service/org?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=serviceId,desc&searchText=${data.searchText}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_SERVICE_FIELD,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const GetServiceFieldLists = (data: any) => (dispatch: any) => {
  masterAPI
    .get(`service`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_SERVICE_FIELD_LIST,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const DeleteServiceField = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  masterAPI
    .delete(`service/${data.id}/${data.userId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_SERVICE_FIELD,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.error("Error deleting label:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

//GST  APIS
export const AddGst = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  masterAPI
    .post(`gst`, data)
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.ADD_GST,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error adding Gst:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearAddGst = () => ({
  type: actionTypes.ADD_GST_CLEAR,
});

export const EditGst = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  masterAPI
    .put(`gst/${data.id}`, data)
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.EDIT_GST,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error editing Gst:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearEditGst = () => ({
  type: actionTypes.EDIT_GST_CLEAR,
});

export const GetGst = (data: any) => (dispatch: any) => {
  masterAPI
    .get(
      // `gst`
      `gst/org?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=gstId,desc&searchText=${data.searchText}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_GST,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const GetGstList = (data: any) => (dispatch: any) => {
  masterAPI
    .get(
      // `gst`
      `gst`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_GST_LIST,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const DeleteGst = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  masterAPI
    .delete(`gst/${data.id}/${data.userId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_GST,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.error("Error deleting label:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};
