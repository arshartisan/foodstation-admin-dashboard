// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
}

// Customer types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  createdAt: Date;
}

// Vendor types
export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  products: string[];
  createdAt: Date;
}

// Order types
export interface DeliveryOrder {
  id: string;
  customerId: string;
  vendorId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled';
  totalAmount: number;
  deliveryAddress: string;
  estimatedDelivery: Date;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// Staff types
export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'delivery' | 'support';
  status: 'active' | 'inactive';
  createdAt: Date;
}

// Transaction types
export interface Transaction {
  id: string;
  orderId: string;
  customerId: string;
  amount: number;
  type: 'payment' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: Date;
}

// Payment types
export interface Payment {
  id: string;
  transactionId: string;
  method: 'card' | 'cash' | 'digital-wallet';
  status: 'processing' | 'completed' | 'failed';
  amount: number;
  createdAt: Date;
}
