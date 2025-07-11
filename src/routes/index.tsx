import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import DeliveryLayout from "@/layouts/DeliveryLayout";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

// Dashboard Pages
import DashboardPage from "@/pages/dashboard/DashboardPage";
import CustomersPage from "@/pages/customers/CustomersPage";
import VendorsPage from "@/pages/vendors/VendorsPage";
import CreateVendorPage from "@/pages/vendors/CreateVendorPage";
import VendorItemsPage from "@/pages/vendors/VendorItemsPage";
import CreateVendorItemPage from "@/pages/vendors/CreateVendorItemPage";
import DeliveryOrdersPage from "@/pages/delivery-orders/DeliveryOrdersPage";
import StaffsPage from "@/pages/staffs/StaffsPage";
import CreateStaffPage from "@/pages/staffs/CreateStaffPage";
import TransactionsPage from "@/pages/transactions/TransactionsPage";
import PaymentsPage from "@/pages/payments/PaymentsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import IssuesPage from "@/pages/issues/IssuesPage";
import NotificationsPage from "@/pages/notifications/NotificationsPage";

// Delivery Pages
import {
  DeliveryOrdersPage as DeliveryPersonOrdersPage,
  PendingOrdersPage,
  InTransitOrdersPage,
  DeliveredOrdersPage,
  CancelledOrdersPage,
  DeliveryProfilePage,
  RouteMapPage,
} from "@/pages/delivery";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Navigate to="/auth/login" replace />,
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
        path: "vendors/create",
        element: <CreateVendorPage />,
      },
      {
        path: "vendors/:vendorId/items",
        element: <VendorItemsPage />,
      },
      {
        path: "vendors/:vendorId/items/create",
        element: <CreateVendorItemPage />,
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
        path: "staffs/create",
        element: <CreateStaffPage />,
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
      {
        path: "issues",
        element: <IssuesPage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
    ],
  },
  {
    path: "/delivery",
    element: <DeliveryLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/delivery/orders" replace />,
      },
      {
        path: "orders",
        element: <DeliveryPersonOrdersPage />,
      },
      {
        path: "pending",
        element: <PendingOrdersPage />,
      },
      {
        path: "in-transit",
        element: <InTransitOrdersPage />,
      },
      {
        path: "delivered",
        element: <DeliveredOrdersPage />,
      },
      {
        path: "cancelled",
        element: <CancelledOrdersPage />,
      },
      {
        path: "map",
        element: <RouteMapPage />,
      },
      {
        path: "profile",
        element: <DeliveryProfilePage />,
      },
    ],
  },
]);
