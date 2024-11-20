import React, { useEffect } from 'react';
import { useDataContext } from '@/context/DataContext';
import { Sidebar } from '@/components/Sidebar';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useDataContext();
  const router = useRouter();
  const isAuthPage = router.pathname === '/login' || router.pathname === '/register';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (!userData) {
          router.push('/login');
        }
        setUser(userData);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } else {
      if (!isAuthPage) {
        router.push('/login');
      }
    }
  }, []);
  
  return (
    <main className={styles.main}>
      {!isAuthPage && <Sidebar className={styles.sidebar} />}
      <div className={styles.panel}>
        {children}
      </div>
    </main>
  );
};

export default Layout;
