import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDataContext } from '@/context/DataContext';
import { Sidebar } from '@/components/Sidebar';
import { API_URL } from '@/config';
import styles from './Layout.module.css';


const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useDataContext();
  const router = useRouter();
  const isAuthPage = router.pathname === '/login' || router.pathname === '/register';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/protected`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await response.json();

        if (token) {
          try {
            if (!userData) {
              router.push('/login');
            }
            setUser(userData);
          } catch (err) {
            console.error("Error parsing user from localStorage:", err);
            localStorage.removeItem('token');
          }
        } else {
          if (!isAuthPage) {
            router.push('/login');
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
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
