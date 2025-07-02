# FS Admin - Delivery System Dashboard

A modern, responsive delivery system administration dashboard built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Dashboard Overview**: Real-time statistics and quick insights
- **Customer Management**: Comprehensive customer database management
- **Vendor Management**: Handle vendor partnerships and relationships
- **Delivery Orders**: Track and manage all delivery orders and shipments
- **Staff Management**: Manage team members, roles, and permissions
- **Transactions**: Complete financial transaction history
- **Payments**: Payment processing and management
- **Settings**: Application configuration and user preferences
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface using shadcn/ui components

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   └── ui/              # shadcn/ui components
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── customers/      # Customer management
│   ├── vendors/        # Vendor management
│   ├── delivery-orders/# Order management
│   ├── staffs/         # Staff management
│   ├── transactions/   # Transaction pages
│   ├── payments/       # Payment pages
│   └── settings/       # Settings pages
├── layouts/            # Layout components
│   ├── AuthLayout.tsx  # Authentication layout
│   └── DashboardLayout.tsx # Main dashboard layout
├── routes/             # Route configuration
├── services/           # API services
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── lib/                # Utility functions
└── assets/             # Static assets
```

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## 🎯 Routes

- `/login` - Authentication page
- `/dashboard` - Main dashboard with overview
- `/customers` - Customer management
- `/vendors` - Vendor management
- `/delivery-orders` - Order tracking and management
- `/staffs` - Staff management
- `/transactions` - Transaction history
- `/payments` - Payment management
- `/settings` - Application settings

## 🚧 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration.

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Responsive Design

The application is fully responsive and includes:
- **Desktop**: Full sidebar navigation with expanded content
- **Tablet**: Collapsible sidebar with responsive grid layouts
- **Mobile**: Hidden sidebar with hamburger menu and mobile-optimized layouts

## 🎨 UI Components

Built with shadcn/ui components including:
- Cards, Tables, Forms
- Buttons, Inputs, Labels
- Dialogs, Sheets, Popover
- Navigation, Breadcrumbs
- Charts, Badges, Avatars
- And many more...

## 🔧 Development

### Adding New Pages

1. Create page component in appropriate folder under `src/pages/`
2. Add route in `src/routes/index.tsx`
3. Add navigation item in `src/layouts/DashboardLayout.tsx`

### API Integration

- API service configuration in `src/services/api.ts`
- Environment variables in `.env`
- Type definitions in `src/types/index.ts`

### Styling

- Tailwind CSS classes for styling
- Global styles in `src/index.css`
- Component-specific styles co-located with components

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```
