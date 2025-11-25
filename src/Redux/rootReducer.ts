import { combineReducers } from "redux";

import loadingReducer from "./Common/Loading/reducer";
import UserReducer from "./Api/User/reducer";
import LoginReducer from "./Api/Authentication/reducer";
import SettingReducers from "./Api/Settings/reducer";
import CustomerReducers from "./Api/Customer/reducer";
import InvoiceReducers from "./Api/Invoice/reducer";
import ReportReducers from "./Api/Reports/reducers";
import DashboardReducers from "./Api/Dashboard/reducer";
import VendorReducers from "./Api/Vendor/reducers";
import PurchaseReducers from "./Api/Purchase/reducer";
import FilterReducer from "./Common/Filter States/reducer";
export default combineReducers({
  loading: loadingReducer,
  FilterReducer,
  LoginReducer,
  SettingReducers,
  CustomerReducers,
  VendorReducers,
  InvoiceReducers,
  PurchaseReducers,
  ReportReducers,
  UserReducer,
  DashboardReducers,
});
