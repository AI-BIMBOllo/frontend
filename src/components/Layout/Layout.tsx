import React from 'react';
import { DataProvider } from '@/context/DataContext';
import { Sidebar } from '@/components/Sidebar';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <main className={styles.main}>
        <Sidebar className={styles.sidebar} />
        <div className={styles.panel}>
          {children}
        </div>
      </main>
    </DataProvider>
  )
}

export default Layout;
