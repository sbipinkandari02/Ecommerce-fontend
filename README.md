# 🛍️ E-Commerce MERN Frontend

A modern, full-featured e-commerce platform built with **React**, **TypeScript**, and **Vite**. Includes customer shopping experience and comprehensive admin dashboard with analytics.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Architecture](#-architecture)
- [Directory Structure](#-directory-structure)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-variables)
- [API Integration](#-api-integration)
- [Component Hierarchy](#-component-hierarchy)
- [State Management](#-state-management)
- [Styling](#-styling-approach)

---

## 📦 Project Overview

This is a **React + TypeScript + Vite** frontend for a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application. It features a modern, responsive UI with:

- 🛒 Complete shopping experience (browse, search, cart, checkout)
- 📊 Advanced admin dashboard with KPIs and analytics
- 📈 Real-time charts (Bar, Pie, Line charts)
- 👥 Customer & order management
- 🔐 Firebase authentication
- 💳 Stripe payment integration
- 📱 Fully responsive mobile design

---

## 🏗️ Architecture

```
Frontend (React + TypeScript + Vite)
    ↓
Redux Store (State Management)
    ↓
API Layer (RTK Query)
    ↓
Backend API (Node.js + Express)
```

### **Layered Architecture**
- **Presentation Layer**: React components with TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **API Integration**: Axios with RTK Query hooks
- **Styling**: SCSS with mixin utilities
- **Authentication**: Firebase Google OAuth

---

## 📁 Directory Structure

### **Root Configuration**
```
├── index.html                 # Entry HTML with meta tags
├── package.json              # Dependencies & scripts
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.js          # ESLint rules
├── .env                       # Environment variables
└── README.md                 # This file
```

### **Source Code Structure** (`src/`)

#### **Pages** (`src/pages/`)
```
pages/
├── home.tsx                           # Landing page with products grid
├── search.tsx                         # Product search with filters
├── cart.tsx                           # Shopping cart
├── shipping.tsx                       # Shipping address form
├── checkout.tsx                       # Payment processing (Stripe)
├── orders.tsx                         # Order history
├── order-details.tsx                  # Individual order details
├── login.tsx                          # Firebase authentication
├── not-found.tsx                      # 404 page
│
└── admin/
    ├── dashboard.tsx                  # Admin dashboard with stats & charts
    ├── products.tsx                   # Products listing table
    ├── customers.tsx                  # Customers management
    ├── transaction.tsx                # Orders/transactions table
    │
    ├── charts/
    │   ├── barcharts.tsx             # Bar chart analytics
    │   ├── piecharts.tsx             # Pie/Doughnut chart analytics
    │   └── linecharts.tsx            # Line chart analytics
    │
    ├── management/
    │   ├── productmanagement.tsx     # Edit/delete products
    │   ├── newproduct.tsx            # Create new product form
    │   └── transactionmanagement.tsx # Edit/delete orders
    │
    └── apps/
        ├── coupon.tsx                # Coupon management
        ├── stopwatch.tsx             # Stopwatch utility
        └── toss.tsx                  # Coin toss game
```

#### **Components** (`src/components/`)
```
components/
├── header.tsx                # Navigation header with user menu
├── loader.tsx                # Loading spinner & skeleton loader
├── cart-item.tsx             # Individual cart item component
├── product-card.tsx          # Product card in grid
├── protected-route.tsx       # Route protection (auth & admin)
│
└── admin/
    ├── AdminSidebar.tsx      # Admin navigation sidebar
    ├── TableHOC.tsx          # Higher-order component for data tables
    ├── Charts.tsx            # Bar, Line, Pie, Doughnut charts
    └── DashboardTable.tsx    # Latest transactions table
```

#### **Redux** (`src/redux/`)
```
redux/
├── store.ts                  # Redux store configuration
│
├── api/
│   ├── productAPI.ts         # Product CRUD operations
│   ├── userAPI.ts            # User auth & management
│   ├── orderAPI.ts           # Order management
│   └── dashboardAPI.ts       # Analytics data
│
└── reducer/
    ├── userReducer.ts        # User authentication state
    ├── cartReducer.ts        # Shopping cart state
    └── index.ts              # Combined reducers
```

#### **Types** (`src/types/`)
```
types/
├── types.ts                  # Domain models (User, Product, Order, etc.)
├── api-types.ts              # API request/response types
└── reducer-types.ts          # Redux state types
```

#### **Styles** (`src/styles/`)
```
styles/
├── app.scss                  # Global styles, layout, tables
├── _home.scss                # Home page styles
├── _cart.scss                # Cart page styles
├── _shipping.scss            # Shipping form styles
├── _login.scss               # Login form styles
├── _search.scss              # Search page styles
│
└── admin-styles/
    ├── _mixin.scss           # SCSS mixins (flex, grid, buttons)
    ├── _dashboard.scss       # Dashboard layout & widgets
    ├── _products.scss        # Product management styles
    ├── _chart.scss           # Chart container styles
    ├── _dashboardapp.scss    # Dashboard app styles
    └── _mediaquery.scss      # Responsive breakpoints
```

#### **Utils & Assets**
```
├── utils/
│   └── features.ts           # Helper functions (image transform, toast, etc.)
│
├── firebase.ts               # Firebase initialization
├── App.tsx                   # Main app with routing
├── main.tsx                  # React entry point with Redux Provider
└── assets/
    ├── images/               # Image assets
    └── videos/               # Video assets
```

---

## ✨ Features

### **Customer Features**
- ✅ Google Firebase authentication
- ✅ Browse products with lazy loading
- ✅ Advanced search with filters (price, category, sort)
- ✅ Shopping cart with persistence
- ✅ Secure checkout with Stripe
- ✅ Order history and tracking
- ✅ Responsive mobile design
- ✅ Real-time notifications (toast)

### **Admin Features**
- 📊 Dashboard with KPIs, stats, and widgets
- 📦 Complete product CRUD operations
- 👥 Customer management and analytics
- 📋 Order management with status tracking
- 📈 Advanced analytics (Bar, Pie, Line charts)
- 🎫 Coupon management system
- 🛠️ Utility apps (stopwatch, coin toss)
- 🔒 Role-based access control

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 18.3 with TypeScript |
| **Build Tool** | Vite 5.4 |
| **State Management** | Redux Toolkit 2.11 + RTK Query |
| **Styling** | SCSS with mixin utilities |
| **Authentication** | Firebase 12.7 |
| **Charts** | Chart.js 4.5 + react-chartjs-2 |
| **Tables** | react-table 7.8 |
| **Icons** | react-icons 5.5 |
| **Notifications** | react-hot-toast 2.6 |
| **HTTP Client** | Axios 1.13 |
| **Date Library** | Moment.js 2.30 |
| **Routing** | React Router 7.11 |
| **Payment** | Stripe 5.4 |

---

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ecommerce-mern.git
cd Ecommerce-fontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables** (see [Environment Variables](#-environment-variables))

### **Development Server**
```bash
npm run dev
```
Server runs on `http://localhost:5173`

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Linting**
```bash
npm run lint
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_SERVER=http://localhost:4000

# Firebase Configuration
VITE_FIREBASE_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

**Get Firebase credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create or select your project
3. Go to Project Settings → Service Accounts
4. Copy your credentials

---

## 🔗 API Integration

### **Base URL**
```
${VITE_SERVER}/api/v1/
```

### **API Endpoints**

#### **Products**
- `GET /product/latest` - Get latest products
- `GET /product/all` - Get all products
- `GET /product/:id` - Get product details
- `POST /product/new` - Create product (admin)
- `PUT /product/:id` - Update product (admin)
- `DELETE /product/:id` - Delete product (admin)

#### **Users**
- `POST /user/login` - Firebase authentication
- `GET /user/:id` - Get user profile
- `GET /user/all` - Get all users (admin)
- `DELETE /user/:id` - Delete user (admin)

#### **Orders**
- `POST /order/new` - Create new order
- `GET /order/my` - Get user's orders
- `GET /order/all` - Get all orders (admin)
- `GET /order/:id` - Get order details
- `PUT /order/:id` - Update order status (admin)
- `DELETE /order/:id` - Delete order (admin)

#### **Dashboard**
- `GET /dashboard/stats` - Dashboard statistics
- `GET /dashboard/pie` - Pie chart data
- `GET /dashboard/bar` - Bar chart data
- `GET /dashboard/line` - Line chart data

---

## 🎯 Component Hierarchy

```
App
├── Header
├── Routes
│   ├── Public Routes
│   │   ├── Home
│   │   │   └── ProductCard (Grid)
│   │   ├── Search
│   │   │   └── ProductCard (Filtered)
│   │   ├── Cart
│   │   │   └── CartItem
│   │   ├── Shipping
│   │   ├── Checkout
│   │   ├── Orders
│   │   │   └── TableHOC
│   │   └── Login (Firebase)
│   │
│   └── Protected Routes (Admin)
│       ├── Dashboard
│       │   ├── AdminSidebar
│       │   ├── Widgets
│       │   ├── Charts (Bar, Doughnut)
│       │   └── DashboardTable
│       ├── Products
│       │   ├── ProductCard (TableHOC)
│       │   ├── Manage Product
│       │   └── New Product
│       ├── Customers (TableHOC)
│       ├── Transactions (TableHOC)
│       ├── Charts
│       │   ├── BarChart
│       │   ├── PieChart
│       │   └── LineChart
│       └── Apps
│           ├── Coupon
│           ├── Stopwatch
│           └── Toss
│
└── Toaster (Toast Notifications)
```

---

## 📊 State Management

### **Redux Store Structure**
```
Store
├── API Slices (RTK Query)
│   ├── productAPI
│   │   ├── getLatestProducts
│   │   ├── getAllProducts
│   │   ├── searchProducts
│   │   ├── getProductDetails
│   │   ├── createProduct
│   │   ├── updateProduct
│   │   └── deleteProduct
│   ├── userAPI
│   │   ├── login
│   │   ├── getAllUsers
│   │   └── deleteUser
│   ├── orderAPI
│   │   ├── createOrder
│   │   ├── getMyOrders
│   │   ├── getAllOrders
│   │   ├── getOrderDetails
│   │   ├── updateOrder
│   │   └── deleteOrder
│   └── dashboardAPI
│       ├── getStats
│       ├── getPieData
│       ├── getBarData
│       └── getLineData
│
└── Reducers
    ├── userReducer
    │   ├── userExist (setUser)
    │   └── userNotExist (logout)
    └── cartReducer
        ├── addToCart
        ├── removeFromCart
        ├── updateQuantity
        └── saveShippingInfo
```

### **Data Flow**
```
Component → useQuery/useMutation Hook → RTK Query → API → Response → Redux Cache → Component Re-render
```
## 🔐 Security & Best Practices

- ✅ Protected routes with authentication check
- ✅ Admin-only routes with role verification
- ✅ Firebase OAuth 2.0 authentication
- ✅ Environment variables for sensitive data
- ✅ CORS configuration on API
- ✅ Input validation on forms
- ✅ Error boundary handling
- ✅ Lazy loading of pages for performance
- ✅ RTK Query caching and automatic invalidation

---

## 📈 Performance Optimizations

- ⚡ Code splitting with lazy loading
- ⚡ Image optimization via Cloudinary
- ⚡ RTK Query caching mechanism
- ⚡ Skeleton loaders for better UX
- ⚡ Memoization of expensive components
- ⚡ Vite fast refresh (HMR)

---