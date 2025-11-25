// Inactie Icons
import Dashboard from "../../Assets/Sidebar Icons/dashboard.png";
import Bill from "../../Assets/Sidebar Icons/bill.png";
import Customer from "../../Assets/Sidebar Icons/customer.png";
import Settings from "../../Assets/Sidebar Icons/settings.png";
import Reports from "../../Assets/Sidebar Icons/reports.png";
import Purchase from '../../Assets/Sidebar Icons/purchase.png'
// Active Icons
import DashboardActive from "../../Assets/Sidebar Icons/Active Icons/dashboard-active.png";
import BillActive from "../../Assets/Sidebar Icons/Active Icons/bill-active.png";
import CustomerActive from "../../Assets/Sidebar Icons/Active Icons/customer-active.png";
import SettingsActive from "../../Assets/Sidebar Icons/Active Icons/settings-active.png";
import ReportsActive from "../../Assets/Sidebar Icons/Active Icons/reportActive.png";
import PurchaseActive from '../../Assets/Sidebar Icons/Active Icons/purchase-active.png'

interface SubNavItem {
  title: string;
  path: string;
}

interface NavItem {
  title: string;
  path: string;
  icon: string;
  activeIcon: string;
  subNav: SubNavItem[];
}

export const SidebarData: NavItem[] = [
  {
    title: "Dashboard",
    path: "/home/dashboard",
    icon: Dashboard,
    activeIcon: DashboardActive,
    subNav: [
      // { title: 'Overview', path: '/home/employees/overview' },
      // { title: 'Employee List', path: '/home/employees/list' },
    ],
  },
  // {
  //   title: "Bills",
  //   path: "/home/bill",
  //   icon: Bill,
  //   activeIcon: BillActive,
  //   subNav: [],
  // },
  {
    title: "Customers",
    path: "/home/customer",
    icon: Customer,
    activeIcon: CustomerActive,
    subNav: [],
  },
  {
    title: "Transactions",
    path: "/home/transactions",
    icon: Reports,
    activeIcon: ReportsActive,
    subNav: [],
  },
  {
    title: "Invoice",
    path: "/home/invoice",
    icon: Bill,
    activeIcon: BillActive,
    subNav: [],
  },
   {
    title: "Vendors",
    path: "/home/vendor",
    icon: Customer,
    activeIcon: CustomerActive,
    subNav: [],
  },
  {
    title: "Purchase",
    path: "/home/purchase",
    icon: Purchase,
    activeIcon: PurchaseActive,
    subNav: [],
  },
  {
    title: "Settings",
    path: "/home/settings",
    icon: Settings,
    activeIcon: SettingsActive,
    subNav: [
      { title: "Services", path: "/home/settings/service-field" },
      { title: "GST", path: "/home/settings/gst" },
    ],
  },
  {
    title: "Reports",
    path: "/home/reports",
    icon: Reports,
    activeIcon: ReportsActive,
    subNav: [
      { title: "Sales Report", path: "/home/reports/sales-report" },
      { title: "GST Report", path: "/home/reports/gst-report" },
      // { title: "Purchase Report", path: "/home/settings/purchase-report" },
    ],
  },
];
