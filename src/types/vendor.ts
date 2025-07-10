export interface Vendor {
    id: number;
    name: string;
    owner: string;
    location: string;
    category: string;
    type: "food" | "grocery";
    status: "active" | "pending" | "inactive";
    rating: number;
    orders: number;
    revenue: string;
    joinDate: string;
    image: string;
}

export interface VendorItem {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    status: "available" | "out_of_stock" | "discontinued";
    image: string;
    sku: string;
    vendorId: number;
}

export interface CreateVendorFormData {
    name: string;
    owner: string;
    email: string;
    phone: string;
    location: string;
    address: string;
    type: "food" | "grocery";
    category: string;
    description: string;
    image: File | null;
}

export interface VendorDetailsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    vendor: Vendor | null;
    onStatusUpdate: (id: number, status: "active" | "pending" | "inactive") => void;
}

export interface VendorStatusProps {
    status: "active" | "pending" | "inactive";
}
