import React from 'react';
import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import CustomerLayout from './pages/customer/CustomerLayout';
import MenuPage from './pages/customer/MenuPage';
import CartPage from './pages/customer/CartPage';
import ConfirmPage from './pages/customer/ConfirmPage';
import StatusPage from './pages/customer/StatusPage';
import PaymentPage from './pages/customer/PaymentPage';
import KitchenPage from './pages/kitchen/KitchenPage';
import AdminLayout from './pages/admin/AdminLayout';
import MenuManagementPage from './pages/admin/MenuManagementPage';
import TableManagementPage from './pages/admin/TableManagementPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';
import InventoryLayout from './pages/inventory/InventoryLayout';
import AlertsPage from './pages/inventory/AlertsPage';
import IngredientsPage from './pages/inventory/IngredientsPage';
import RestockPage from './pages/inventory/RestockPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <MenuPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'confirm', element: <ConfirmPage /> },
      { path: 'status', element: <StatusPage /> },
      { path: 'payment', element: <PaymentPage /> },
    ],
  },
  {
    path: '/kitchen',
    element: <KitchenPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'menu', element: <MenuManagementPage /> },
      { path: 'tables', element: <TableManagementPage /> },
      { path: 'orders', element: <OrderManagementPage /> },
    ],
  },
  {
    path: '/inventory',
    element: <InventoryLayout />,
    children: [
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'ingredients', element: <IngredientsPage /> },
      { path: 'restock', element: <RestockPage /> },
    ],
  },
]);