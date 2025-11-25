import { actionTypes } from "./action";

const INITIAL_STATE = {
  AddCustomerRes: null,
  EditCustomerRes: null,
  GetCustomerRes: null,
  DeleteCustomerRes: null,
  GetCustomerById: null,
  GetCustomerByPhone: null,
  GetCustomerList: null,
  GetInvoiceByCust: null,
  GetInvoiceStatusByCust: null,
};

const CustomerReducers = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Customers
    case actionTypes.ADD_CUSTOMER:
      return {
        ...state,
        AddCustomerRes: action.payload,
      };

    case actionTypes.ADD_CUSTOMER_CLEAR:
      return {
        ...state,
        AddCustomerRes: null,
      };
    case actionTypes.EDIT_CUSTOMER:
      return {
        ...state,
        EditCustomerRes: action.payload,
      };
    case actionTypes.EDIT_CUSTOMER_CLEAR:
      return {
        ...state,
        EditCustomerRes: null,
      };
    case actionTypes.GET_CUSTOMER:
      return {
        ...state,
        GetCustomerRes: action.payload,
      };
    case actionTypes.DELETE_CUSTOMER:
      return {
        ...state,
        DeleteCustomerRes: action.payload,
      };
    case actionTypes.GET_CUSTOMER_LIST:
      return {
        ...state,
        GetCustomerList: action.payload,
      };
    case actionTypes.GET_CUSTOMER_BY_ID:
      return {
        ...state,
        GetCustomerById: action.payload,
      };
    case actionTypes.CLEAR_CUST_BY_ID:
      return {
        ...state,
        GetCustomerById: null,
      };
    case actionTypes.GET_CUSTOMER_BY_PHONE:
      return {
        ...state,
        GetCustomerByPhone: action.payload,
      };
      case actionTypes.CLEAR_CUST_BY_NUM:
      return {
        ...state,
        GetCustomerByPhone: null,
      };
    case actionTypes.GET_INVOICE_BY_CUST:
      return {
        ...state,
        GetInvoiceByCust: action.payload,
      };
    case actionTypes.CLEAR_INVOICE_BY_CUST:
      return {
        ...state,
        GetInvoiceByCust: null,
      };

    case actionTypes.GET_INVOICE_STATUS_BY_CUST:
      return {
        ...state,
        GetInvoiceStatusByCust: action.payload,
      };
    case actionTypes.CLEAR_INVOICE_STATUS_BY_CUST:
      return {
        ...state,
        GetInvoiceStatusByCust: null,
      };
    default:
      return state;
  }
};

export default CustomerReducers;
