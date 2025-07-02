// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Application Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CUSTOMERS: '/customers',
  VENDORS: '/vendors',
  DELIVERY_ORDERS: '/delivery-orders',
  STAFFS: '/staffs',
  TRANSACTIONS: '/transactions',
  PAYMENTS: '/payments',
  SETTINGS: '/settings',
} as const;

// Status Options
export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'in-transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
] as const;

export const CUSTOMER_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const;

export const VENDOR_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const;

export const STAFF_ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'support', label: 'Support' },
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'fs_admin_token',
  USER_DATA: 'fs_admin_user',
  THEME: 'fs_admin_theme',
} as const;
