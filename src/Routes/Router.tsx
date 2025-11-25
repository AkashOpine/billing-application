import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Pages/Authentication/Login";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import SetNewPassword from "../Pages/Authentication/SetNewPassword";
import Done from "../Pages/Authentication/Done";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardOverview from "../Pages/Dashboard/Sub/DashboardOverview";
import Bill from "../Pages/Bill/Bill";
import BillList from "../Pages/Bill/Sub/BillList";
import AddBills from "../Pages/Bill/Sub/AddBills";
import Customer from "../Pages/Customer/Customer";
import CustomerList from "../Pages/Customer/Sub/CustomerList";
import ViewCustomer from "../Pages/Customer/Sub/ViewCustomer";
import Settings from "../Pages/Settings/Settings";
import ServiceField from "../Pages/Settings/Sub/Service Field/ServiceField";
import GST from "../Pages/Settings/Sub/GST/GST";
import SecondaryAddBills from "../Pages/Bill/Sub/Add Bill 2/SecondaryAddBills";
import Reports from "../Pages/Reports/Reports";
import AddInvoice from "../Pages/Invoice/Sub/AddInvoice";
import InvoiceList from "../Pages/Invoice/Sub/InvoiceList";
import Invoice from "../Pages/Invoice/Invoice";
import SalesReport from "../Pages/Reports/Sub/Sales Report/SalesReport";
import GstReport from "../Pages/Reports/Sub/GST Report/GstReport";
import PurchaseReport from "../Pages/Reports/Sub/Purchase Report/PurchaseReport";
import Transactions from "../Pages/Transactions/Transactions";
import TransactionsList from "../Pages/Transactions/Sub/TransactionsList";
import Vendor from "../Pages/Vendor/Vendor";
import VendorList from "../Pages/Vendor/Sub/VendorList";
import ViewVendor from "../Pages/Vendor/Sub/ViewVendor";
import Purchase from "../Pages/Purchase/Purchase";
import PurchaseList from "../Pages/Purchase/Sub/PurchaseList";
import AddPurchase from "../Pages/Purchase/Sub/AddPurchase";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/set-new-password" element={<SetNewPassword />} />
      <Route path="/done" element={<Done />} />

      <Route path="home" element={<Home />}>
        <Route index element={<Navigate to="dashboard" />} />

        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="overview" />} />
          <Route path="overview" element={<DashboardOverview />} />
        </Route>
        <Route path="bill" element={<Bill />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<BillList />} />
          <Route path="list/add" element={<SecondaryAddBills />} />
          <Route path="list/add-new" element={<AddBills />} />
        </Route>
        <Route path="purchase" element={<Purchase />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<PurchaseList />} />
          <Route path="list/add" element={<AddPurchase />} />
          <Route path="list/add/:id" element={<AddPurchase />} />
        </Route>
          <Route path="invoice" element={<Invoice />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<InvoiceList />} />
          <Route path="list/add" element={<AddInvoice />} />
          <Route path="list/add/:id" element={<AddInvoice />} />
        </Route>
        <Route path="customer" element={<Customer />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<CustomerList />} />
          <Route path="list/view/:id" element={<ViewCustomer />} />
        </Route>
        <Route path="vendor" element={<Vendor />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<VendorList />} />
          <Route path="list/view/:id" element={<ViewVendor />} />
        </Route>
        <Route path="transactions" element={<Transactions />}>
          <Route index element={<Navigate to="list" />} />
          <Route path="list" element={<TransactionsList />} />
        </Route>
        <Route path="settings" element={<Settings />}>
          <Route index element={<Navigate to="service-field" />} />
          <Route path="service-field" element={<ServiceField />} />
          <Route path="gst" element={<GST />} />
        </Route>
        <Route path="reports" element={<Reports />}>
          <Route index element={<Navigate to="sales-report" />} />
          <Route path="sales-report" element={<SalesReport />} />
          <Route path="gst-report" element={<GstReport />} />
          <Route path="purchase-report" element={<PurchaseReport />} />
        </Route>
      </Route>
       <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default Router;
