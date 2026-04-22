import React from 'react';
import { Outlet } from 'react-router';
import { AppProvider } from '../../context/AppContext';

export default function CustomerLayout() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}
