import { startLoading, stopLoading } from "../../Common/Loading/action";
import { handleApiResponse } from "../../../Lib/ApiUtils";
import { billingAPI } from "../../../Config/ApiClient";
import toast from "react-hot-toast";

export const actionTypes = {
  //Purchase
  ADD_PURCHASE: "ADD_PURCHASE",
  ADD_PURCHASE_CLEAR: "ADD_PURCHASE_CLEAR",

  EDIT_PURCHASE: "EDIT_PURCHASE",
  EDIT_PURCHASE_CLEAR: "EDIT_PURCHASE_CLEAR",

  GET_PURCHASE: "GET_PURCHASE",

  DELETE_PURCHASE: "DELETE_PURCHASE",

  GET_PURCHASE_BY_ID: "GET_PURCHASE_BY_ID",

  GET_PURCHASE_PDF: "GET_PURCHASE_PDF",
};

export const AddPurchaseData = (formData: FormData) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .post(`purchase-order/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.ADD_PURCHASE,
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

export const ClearAddPurchase = () => ({
  type: actionTypes.ADD_PURCHASE_CLEAR,
});

export const EditPurchase = (formData: FormData) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .put(`purchase-order/edit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.EDIT_PURCHASE,
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

export const ClearEditPurchase = () => ({
  type: actionTypes.EDIT_PURCHASE_CLEAR,
});

export const GetPurchase = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `purchase-order/org?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=poId,desc&searchText=${data.searchText}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PURCHASE,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const DeletePurchase = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .delete(`purchase-order/${data.id}/${data.userId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_PURCHASE,
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

export const GetPurchaseById = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`purchase-order/${data.id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PURCHASE_BY_ID,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const GetPurchasePDF = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`invoice/pdf/${data.id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_PURCHASE_PDF,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting  data:", error);
    });
};
