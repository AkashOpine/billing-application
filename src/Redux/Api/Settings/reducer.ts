import { actionTypes } from "./action";

const INITIAL_STATE = {
  AddServiceFieldRes: null,
  EditServiceFieldRes: null,
  GetServiceFieldRes: null,
  GetServiceFieldListRes:null,
  DeleteServiceFieldRes: null,

  AddGstRes: null,
  EditGstRes: null,
  GetGstRes: null,
  GetGstListRes:null,
  DeleteGstRes: null,
};

const SettingReducers = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    //SERVICE FIELD
    case actionTypes.ADD_SERVICE_FIELD:
      return {
        ...state,
        AddServiceFieldRes: action.payload,
      };
    case actionTypes.ADD_SERVICE_FIELD_CLEAR:
      return {
        ...state,
        AddServiceFieldRes: null,
      };
    case actionTypes.EDIT_SERVICE_FIELD:
      return {
        ...state,
        EditServiceFieldRes: action.payload,
      };
    case actionTypes.EDIT_SERVICE_FIELD_CLEAR:
      return {
        ...state,
        EditServiceFieldRes: null,
      };
    case actionTypes.GET_SERVICE_FIELD:
      return {
        ...state,
        GetServiceFieldRes: action.payload,
      };

      case actionTypes.GET_SERVICE_FIELD_LIST:
      return {
        ...state,
        GetServiceFieldListRes: action.payload,
      };

    case actionTypes.DELETE_SERVICE_FIELD:
      return {
        ...state,
        DeleteServiceFieldRes: action.payload,
      };

    //GST FIELD
    case actionTypes.ADD_GST:
      return {
        ...state,
        AddGstRes: action.payload,
      };
    case actionTypes.ADD_GST_CLEAR:
      return {
        ...state,
        AddGstRes: null,
      };
    case actionTypes.EDIT_GST:
      return {
        ...state,
        EditGstRes: action.payload,
      };
    case actionTypes.EDIT_GST_CLEAR:
      return {
        ...state,
        EditGstRes: null,
      };
    case actionTypes.GET_GST:
      return {
        ...state,
        GetGstRes: action.payload,
      };

      case actionTypes.GET_GST_LIST:
      return {
        ...state,
        GetGstListRes: action.payload,
      };

    case actionTypes.DELETE_GST:
      return {
        ...state,
        DeleteGstRes: action.payload,
      };
    default:
      return state;
  }
};

export default SettingReducers;
