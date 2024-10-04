import React from 'react';
import Link from 'next/link';

import styles from './Sidebar.module.css';

const Sidebar = ({ className }: { className?: string }) => {
    interface NavLink {
        href: string;
        icon: string;
        label: string;
    }

    const navLinks: NavLink[] = [
        {
            href: '/',
            icon: 'dashboard',
            label: 'Panel'
        },
        {
            href: '/trucks',
            icon: 'truck',
            label: 'Camiones'
        },
        {
            href: '/account',
            icon: 'user',
            label: 'Cuenta'
        },
        {
            href: '/settings',
            icon: 'settings',
            label: 'Ajustes'
        }
    ]
    
  return (
    <nav className={`${className} ${styles.sidebar}`}>
      <div className="container">
            <div className={styles.content}>
                <h1>Bimbo</h1>
                <ul>
                    {navLinks.map((navLink) => (
                        <li key={navLink.href}>
                            <Link href={navLink.href}>{navLink.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className={styles.footer}>
                    <button>Cerrar sesión</button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Sidebar;
