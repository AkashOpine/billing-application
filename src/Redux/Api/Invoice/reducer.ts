import { actionTypes } from "./action";

const INITIAL_STATE = {
  AddInvoiceRes: null,
  EditInvoiceRes: null,
  GetInvoiceRes: null,
  DeleteInvoiceRes: null,
  GetInvoiceById: null,
  GetInvoicePDF: null,
  GetInvoiceNumRes: null,
  CheckInvoiceNumRes: null,
  AddTransactionRes: null,
  GetTransactionRes: null,
  GetTransactionByInvRes: null,
  ExportTransactionRes:null,
};

const InvoiceReducers = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //Invoices
    case actionTypes.ADD_INVOICE:
      return {
        ...state,
        AddInvoiceRes: action.payload,
      };

    case actionTypes.ADD_INVOICE_CLEAR:
      return {
        ...state,
        AddInvoiceRes: null,
      };

    case actionTypes.EDIT_INVOICE:
      return {
        ...state,
        EditInvoiceRes: action.payload,
      };
    case actionTypes.EDIT_INVOICE_CLEAR:
      return {
        ...state,
        EditInvoiceRes: null,
      };
    case actionTypes.GET_INVOICE:
      return {
        ...state,
        GetInvoiceRes: action.payload,
      };
    case actionTypes.DELETE_INVOICE:
      return {
        ...state,
        DeleteInvoiceRes: action.payload,
      };
    case actionTypes.GET_INVOICE_BY_ID:
      return {
        ...state,
        GetInvoiceById: action.payload,
      };

    case actionTypes.GET_INVOICE_PDF:
      return {
        ...state,
        GetInvoicePDF: action.payload,
      };
    case actionTypes.GET_INVOICE_NUM:
      return {
        ...state,
        GetInvoiceNumRes: action.payload,
      };
    case actionTypes.CLEAR_INVOICE_NUM:
      return {
        ...state,
        GetInvoiceNumRes: null,
      };
    case actionTypes.CHECK_INVOICE_NUM:
      return {
        ...state,
        CheckInvoiceNumRes: action.payload,
      };
      case actionTypes.CLEAR_CHECK_INVOICE_NUM:
      return {
        ...state,
        CheckInvoiceNumRes: null,
      };
    case actionTypes.ADD_TRANSACTIONS:
      return {
        ...state,
        AddTransactionRes: action.payload,
      };

    case actionTypes.ADD_TRANSACTIONS_CLEAR:
      return {
        ...state,
        AddTransactionRes: null,
      };

    case actionTypes.GET_TRANSACTIONS:
      return {
        ...state,
        GetTransactionRes: action.payload,
      };

        case actionTypes.EXPORT_TRANSACTIONS:
      return {
        ...state,
        ExportTransactionRes: action.payload,
      };

    case actionTypes.CLEAR_EXPORT_TRANSACTIONS:
      return {
        ...state,
        ExportTransactionRes: null,
      };

    case actionTypes.GET_TRANSACTIONS_BY_INVOICE:
      return {
        ...state,
        GetTransactionByInvRes: action.payload,
      };
    case actionTypes.GET_TRANSACTIONS_BY_INVOICE_CLEAR:
      return {
        ...state,
        GetTransactionByInvRes: null,
      };
    default:
      return state;
  }
};

export default InvoiceReducers;
