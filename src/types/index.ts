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
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Regional Manager' | 'Delivery Person';
  department: string;
  status: 'active' | 'inactive';
  hireDate: string;
  lastLogin: string;
  permissions: string[];
  salary: string;
  deliveryZone: string;
  vehicleType: 'Motorcycle' | 'Van' | 'Bicycle' | 'Company Car';
  deliveriesCompleted: number;
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

// Issue and Ticket types
export interface Issue {
  id: string;
  title: string;
  description: string;
  reportedBy: 'customer' | 'vendor';
  reporterName: string;
  reporterId: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'escalated';
  category: 'delivery' | 'payment' | 'account' | 'food-quality' | 'billing' | 'technical' | 'other';
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
}

export interface IssueFilters {
  priority: string[];
  status: string[];
  category: string[];
  reportedBy: string[];
}
