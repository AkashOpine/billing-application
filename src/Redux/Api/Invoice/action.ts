import { startLoading, stopLoading } from "../../Common/Loading/action";
import { handleApiResponse } from "../../../Lib/ApiUtils";
import { billingAPI } from "../../../Config/ApiClient";
import toast from "react-hot-toast";
import { downloadBase64File } from "../../../Lib/ExportUtils";

export const actionTypes = {
  //Invoice
  ADD_INVOICE: "ADD_INVOICE",
  ADD_INVOICE_CLEAR: "ADD_INVOICE_CLEAR",

  EDIT_INVOICE: "EDIT_INVOICE",
  EDIT_INVOICE_CLEAR: "EDIT_INVOICE_CLEAR",

  GET_INVOICE: "GET_INVOICE",

  DELETE_INVOICE: "DELETE_INVOICE",

  GET_INVOICE_BY_ID: "GET_INVOICE_BY_ID",

  GET_INVOICE_PDF: "GET_INVOICE_PDF",
  GET_INVOICE_NUM: "GET_INVOICE_NUM",
  CLEAR_INVOICE_NUM:"CLEAR_INVOICE_NUM",
  CHECK_INVOICE_NUM: "CHECK_INVOICE_NUM",
  ADD_TRANSACTIONS_CLEAR: "ADD_TRANSACTIONS_CLEAR",
  ADD_TRANSACTIONS: "ADD_TRANSACTIONS",
  GET_TRANSACTIONS: "GET_TRANSACTIONS",
  EXPORT_TRANSACTIONS:"EXPORT_TRANSACTIONS",
  CLEAR_EXPORT_TRANSACTIONS:"CLEAR_EXPORT_TRANSACTIONS",
  GET_TRANSACTIONS_BY_INVOICE: "GET_TRANSACTIONS_BY_INVOICE",
  GET_TRANSACTIONS_BY_INVOICE_CLEAR: "GET_TRANSACTIONS_BY_INVOICE_CLEAR",
  CLEAR_CHECK_INVOICE_NUM:"CLEAR_CHECK_INVOICE_NUM"
};

//INVOICE APIS
export const AddInvoiceData = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .post(`invoice`, data)
    .then((response: any) => {
      if (
        response?.data?.code === 200 &&
        (response?.data?.status === "Success" ||
          response?.data?.status === "Sucess")
      ) {
        toast.success(response?.data.message);
      } else if (
        response?.data?.status === "Failed" ||
        response?.data?.status === "Error"
      ) {
        if (response?.data.data) {
          toast.error(response?.data.message);
        } else {
          toast.error(response?.data?.status);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      dispatch({
        type: actionTypes.ADD_INVOICE,
        payload: response.data,
      });
    })
    .catch((error: any) => {
      console.error("Error adding Invoice:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearAddInvoice = () => ({
  type: actionTypes.ADD_INVOICE_CLEAR,
});

export const EditInvoice = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .put(`invoice/${data.id}`, data)
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.EDIT_INVOICE,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error editing Invoice:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearEditInvoice = () => ({
  type: actionTypes.EDIT_INVOICE_CLEAR,
});

export const GetInvoice = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `invoice/org?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=invoiceId,desc&searchText=${data.searchText}&from=${data.fromDate}&to=${data.toDate}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_INVOICE,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const DeleteInvoice = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .delete(`invoice/${data.id}/${data.userId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.DELETE_INVOICE,
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

export const GetInvoiceById = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`invoice/${data.id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_INVOICE_BY_ID,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

export const GetInvoicePDF = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`invoice/pdf/${data.id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_INVOICE_PDF,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting  data:", error);
    });
};

export const GetInvoiceNum = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`invoice/new-number/org/${data}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_INVOICE_NUM,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting  data:", error);
    });
};
export const ClearInvoiceNum = () => ({
  type: actionTypes.CLEAR_INVOICE_NUM,
});
export const CheckInvoiceNum = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`invoice/check-number?invoiceNumber=${data}`)
    .then((response) => {
      dispatch({
        type: actionTypes.CHECK_INVOICE_NUM,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting  data:", error);
    });
};
export const ClearCheckInvoiceNum = () => ({
  type: actionTypes.CLEAR_CHECK_INVOICE_NUM,
});
export const AddTransactions = (data: any) => (dispatch: any) => {
  dispatch(startLoading());
  billingAPI
    .post(`transactions`, data)
    .then((response: any) => {
      const responseData = handleApiResponse(response);
      dispatch({
        type: actionTypes.ADD_TRANSACTIONS,
        payload: responseData,
      });
    })
    .catch((error: any) => {
      console.error("Error adding Invoice:", error);
    })
    .finally(() => {
      dispatch(stopLoading());
    });
};

export const ClearAddTransactions = () => ({
  type: actionTypes.ADD_TRANSACTIONS_CLEAR,
});
export const GetTransactions = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
      `transactions/org?org_id=${data.org_id}&branch_id=${data.branchId}&page=${data.page}&size=${data.size}&sort=id,desc&searchText=${data.searchText}&from=${data.fromDate}&to=${data.toDate}`
    )
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TRANSACTIONS,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};

// /api/v1/transactions/export/org?org_id=1&branch_id=0&searchText=&from=2025-06-22&to=2025-07-07&gst=
export const ExportTransactionReport = (data: any) => (dispatch: any) => {
  billingAPI
    .get(
       `transactions/export/org?org_id=${data.org_id}&branch_id=${data.branchId}&searchText=${data.searchText}&from=${data.fromDate}&to=${data.toDate}`
    )
    .then((response) => {
        const responseData = response?.data;
        console.log("responseData",responseData);
              
      if (responseData?.code === 200 && responseData?.status === "Success") {
        downloadBase64File(responseData?.data,responseData?.message) 
      }
      dispatch({
        type: actionTypes.EXPORT_TRANSACTIONS,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting list:", error);
    });
};
export const ClearExportTransactionReport = () => ({
  type: actionTypes.CLEAR_EXPORT_TRANSACTIONS,
});

export const GetTransactionsByInvoice = (data: any) => (dispatch: any) => {
  billingAPI
    .get(`transactions/${data.type}/${data.id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TRANSACTIONS_BY_INVOICE,
        payload: response.data?.data,
      });
    })
    .catch((error) => {
      console.error("Error getting user data:", error);
    });
};
export const ClearGetTransactionsByInvoice = () => ({
  type: actionTypes.GET_TRANSACTIONS_BY_INVOICE_CLEAR,
});
