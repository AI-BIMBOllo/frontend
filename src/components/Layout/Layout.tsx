import React from 'react';
import { DataProvider } from '@/context/DataContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <main>{children}</main>
    </DataProvider>
  )
}

export default Layout;
