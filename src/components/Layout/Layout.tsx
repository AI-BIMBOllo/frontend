import React, { useEffect } from 'react';
import { DataProvider, useDataContext } from '@/context/DataContext';
import { Sidebar } from '@/components/Sidebar';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';

// Create a wrapper component to handle auth
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useDataContext();
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    // If user exists and on login page, redirect to home
    if (user && isLoginPage) {
      router.push('/');
    }
  }, [user, isLoginPage, router]);

  // Show loading or nothing while redirecting
  if (!user && !isLoginPage) {
    return null; // or return a loading spinner
  }

  return (
    <main className={styles.main}>
      {!isLoginPage && <Sidebar className={styles.sidebar} />}
      <div className={styles.panel}>
        {children}
      </div>
    </main>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <DataProvider>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </DataProvider>
  );
};

export default Layout;
