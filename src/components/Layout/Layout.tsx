import React from 'react';
import { DataProvider } from '@/context/DataContext';
import { useRouter } from 'next/router';
import { Sidebar } from '@/components/Sidebar';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <DataProvider>
      <main className={styles.main}>
        {router.pathname !== '/login' && <Sidebar className={styles.sidebar} />}
        <div className={styles.panel}>
          {children}
        </div>
      </main>
    </DataProvider>
  );
}

export default Layout;

