import { startLoading, stopLoading } from "../../Common/Loading/action";

import { handleApiResponse } from "../../../Lib/ApiUtils";
import { billingAPI } from "../../../Config/ApiClient";

export const actionTypes = {
  //Service
  ADD_CUSTOMER: "ADD_CUSTOMER",
  ADD_CUSTOMER_CLEAR: "ADD_CUSTOMER_CLEAR",

  EDIT_CUSTOMER: "EDIT_CUSTOMER",
  EDIT_CUSTOMER_CLEAR: "EDIT_CUSTOMER_CLEAR",

  GET_CUSTOMER: "GET_CUSTOMER",
  GET_CUSTOMER_LIST: "GET_CUSTOMER_LIST",
  DELETE_CUSTOMER: "DELETE_CUSTOMER",

  GET_CUSTOMER_BY_ID: "GET_CUSTOMER_BY_ID",
  CLEAR_CUST_BY_ID: "CLEAR_CUST_BY_ID",
  GET_INVOICE_BY_CUST: "GET_INVOICE_BY_CUST",
  CLEAR_INVOICE_BY_CUST: "CLEAR_INVOICE_BY_CUST",
  GET_CUSTOMER_BY_PHONE: "GET_CUSTOMER_BY_PHONE",
  CLEAR_CUST_BY_NUM:"CLEAR_CUST_BY_NUM",
  GET_INVOICE_STATUS_BY_CUST: "GET_INVOICE_STATUS_BY_CUST",
  CLEAR_INVOICE_STATUS_BY_CUST: "CLEAR_INVOICE_STATUS_BY_CUST",
};

//CUSTOMER APIS
export const AddCustomer = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .post(`customer`, data)
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.ADD_CUSTOMER,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error adding Customer:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearAddCustomer = () => ({
  type: actionTypes.ADD_CUSTOMER_CLEAR,
});

export const EditCustomer = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .put(`customer/${data.id}`, data)
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.EDIT_CUSTOMER,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error editing Customer:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearEditCustomer = () => ({
  type: actionTypes.EDIT_CUSTOMER_CLEAR,
});

export const GetCustomer = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `customer/org?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=customerId,desc&searchText=${data.searchText}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const DeleteCustomer = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .delete(`customer/${data.id}/${data.userId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_CUSTOMER,
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

export const GetCustomerList = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`customer`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER_LIST,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const GetCustomerById = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`customer/${data.id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER_BY_ID,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};
export const ClearCustById = () => ({
  type: actionTypes.CLEAR_CUST_BY_ID,
});

export const GetCustomerByPhone = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`customer/by-phone/${data.data}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER_BY_PHONE,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};
export const ClearCustByNum = () => ({
  type: actionTypes.CLEAR_CUST_BY_NUM,
});

export const GetInvoiceByCust = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `invoice/org?org_id=${data.org_id}&page=${data.page}&size=${data.size}&sort=customerId,desc&searchText=&customerId=${data.custId}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_INVOICE_BY_CUST,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};
export const ClearInvoiceByCust = () => ({
  type: actionTypes.CLEAR_INVOICE_BY_CUST,
});

export const GetInvoiceStatusByCust = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`total-balance/${data.org_id}/customer/${data.custId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_INVOICE_STATUS_BY_CUST,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting  data:", error);
    });
};
export const ClearInvoiceStatusByCust = () => ({
  type: actionTypes.CLEAR_INVOICE_STATUS_BY_CUST,
});
