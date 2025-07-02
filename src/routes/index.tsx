import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";

// Dashboard Pages
import DashboardPage from "@/pages/dashboard/DashboardPage";
import CustomersPage from "@/pages/customers/CustomersPage";
import VendorsPage from "@/pages/vendors/VendorsPage";
import DeliveryOrdersPage from "@/pages/delivery-orders/DeliveryOrdersPage";
import StaffsPage from "@/pages/staffs/StaffsPage";
import TransactionsPage from "@/pages/transactions/TransactionsPage";
import PaymentsPage from "@/pages/payments/PaymentsPage";
import SettingsPage from "@/pages/settings/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "vendors",
        element: <VendorsPage />,
      },
      {
        path: "delivery-orders",
        element: <DeliveryOrdersPage />,
      },
      {
        path: "staffs",
        element: <StaffsPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
