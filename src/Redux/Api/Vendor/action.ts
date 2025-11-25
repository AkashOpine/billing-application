import { startLoading, stopLoading } from "../../Common/Loading/action";

import { handleApiResponse } from "../../../Lib/ApiUtils";
import { billingAPI } from "../../../Config/ApiClient";

export const actionTypes = {
  //vendor
  ADD_VENDOR: "ADD_VENDOR",
  ADD_VENDOR_CLEAR: "ADD_VENDOR_CLEAR",

  EDIT_VENDOR: "EDIT_VENDOR",
  EDIT_VENDOR_CLEAR: "EDIT_VENDOR_CLEAR",

  GET_VENDOR: "GET_VENDOR",
  GET_VENDOR_LIST: "GET_VENDOR_LIST",
  DELETE_VENDOR: "DELETE_VENDOR",

  GET_VENDOR_BY_ID: "GET_VENDOR_BY_ID",
  CLEAR_VENDOR_BY_ID: "CLEAR_VENDOR_BY_ID",

  GET_VENDOR_BY_PHONE: "GET_VENDOR_BY_PHONE",
  CLEAR_VENDOR_BY_PHONE: "CLEAR_VENDOR_BY_PHONE",

  GET_PURCHASE_BY_VENDOR: "GET_PURCHASE_BY_VENDOR",
  CLEAR_PURCHASE_BY_VENDOR: "CLEAR_PURCHASE_BY_VENDOR",

  GET_PURCHASE_AMOUNT_BY_VENDOR:"GET_PURCHASE_AMOUNT_BY_VENDOR",
  CLEAR_PURCHASE_AMOUNT_BY_VENDOR:"CLEAR_PURCHASE_AMOUNT_BY_VENDOR",
};

//VENDOR APIS
export const AddVendor = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .post(`vendor`, data)
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.ADD_VENDOR,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error adding Vendor:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearAddVendor = () => ({
  type: actionTypes.ADD_VENDOR_CLEAR,
});

export const EditVendor = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .put(`vendor/${data.id}`, data)
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.EDIT_VENDOR,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error editing Vendor:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearEditVendor = () => ({
  type: actionTypes.EDIT_VENDOR_CLEAR,
});

export const GetVendor = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `vendor/org?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=vendorId,desc&searchText=${data.searchText}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_VENDOR,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const DeleteVendor = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .delete(`vendor/${data.id}/${data.userId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_VENDOR,
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

export const GetVendorList = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`vendor`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_VENDOR_LIST,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const GetVendorById = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`vendor/${data.id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_VENDOR_BY_ID,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};
export const ClearVendorById = () => ({
  type: actionTypes.CLEAR_VENDOR_BY_ID,
});

export const GetVendorByPhone = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`vendor/by-phone/${data.data}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_VENDOR_BY_PHONE,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};
export const ClearVendorByPhone = () => ({
  type: actionTypes.CLEAR_VENDOR_BY_PHONE,
});

// https://tomcat.opine.co.in/billing-app-0.0.1-SNAPSHOT/api/v1/purchase-order/org?org_id=1&branch_id=0&page=1&size=10&sort=poId,desc&searchText=&vendorId=2
export const GetPurchaseByVendor = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `purchase-order/org?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=poId,desc&searchText=&vendorId=${data.vendorId}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PURCHASE_BY_VENDOR,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};
export const ClearPurchaseByVendor = () => ({
  type: actionTypes.CLEAR_PURCHASE_BY_VENDOR,
});

export const GetPurchaseAmountByVendor = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`total-balance/${data.org_id}/vendor/${data.vendorId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PURCHASE_AMOUNT_BY_VENDOR,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting  data:", error);
    });
};
export const ClearPurchaseAmountByVendor = () => ({
  type: actionTypes.CLEAR_PURCHASE_AMOUNT_BY_VENDOR,
});