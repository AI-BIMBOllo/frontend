import React from 'react';
import Link from 'next/link';
import { useDataContext } from '@/context/DataContext';
import styles from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faTruck, faUser, faCog, faMap } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ className }: { className?: string }) => {
    const { setUser } = useDataContext();

    const handleLogout = () => {
        // Clear user context
        setUser(null);
        // Remove from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login
        window.location.href = '/login';
    };

    interface NavLink {
        href: string;
        icon: any; // Adjust type based on the library, e.g., `any` for Font Awesome
        label: string;
    }

    const navLinks: NavLink[] = [
        {
            href: '/panel',
            icon: faDashboard,
            label: 'Panel'
        },
        // {
        //     href: '/trucks',
        //     icon: faTruck,
        //     label: 'CEDIS'
        // },
        {
            href: '/trucks',
            icon: faMap,
            label: 'Rutas'
        },
        {
            href: '/camera',
            icon: faCog,
            label: 'Camera'
        },
        {
            href: '/account',
            icon: faUser,
            label: 'Cuenta'
        }
    ];
    
    return (
        <nav className={`${className} ${styles.sidebar}`}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Bimbo</h1>
                    <ul>
                        {navLinks.map((navLink) => (
                            <li className={styles.buttons} key={navLink.href}>
                                <Link href={navLink.href} key={navLink.href} className={styles.buttons}>
                                <FontAwesomeIcon icon={navLink.icon} className={styles.icon} />
                                <span>{navLink.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.footer}>
                        <button className={styles.button} onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
