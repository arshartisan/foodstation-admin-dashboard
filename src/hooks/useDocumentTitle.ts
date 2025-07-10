import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Route to title mapping
const routeTitleMap: Record<string, string> = {
    '/dashboard': 'Dashboard - FS Admin',
    '/customers': 'Customers - FS Admin',
    '/vendors': 'Vendors - FS Admin',
    '/delivery-orders': 'Delivery Orders - FS Admin',
    '/staffs': 'Staff Management - FS Admin',
    '/notifications': 'Notifications - FS Admin',
    '/transactions': 'Transactions - FS Admin',
    '/payments': 'Payments - FS Admin',
    '/settings': 'Settings - FS Admin',
    '/login': 'Login - FS Admin',
};

const defaultTitle = 'FS Admin';

export const useDocumentTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const title = routeTitleMap[location.pathname] || defaultTitle;
        document.title = title;
    }, [location.pathname]);
};
