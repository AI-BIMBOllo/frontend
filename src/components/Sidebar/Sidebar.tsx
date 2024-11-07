import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faTruck, faUser, faCog, faMap } from '@fortawesome/free-solid-svg-icons';

import styles from './Sidebar.module.css';

const Sidebar = ({ className }: { className?: string }) => {
    interface NavLink {
        href: string;
        icon: any; // Adjust type based on the library, e.g., `any` for Font Awesome
        label: string;
    }

    const navLinks: NavLink[] = [
        {
            href: '/panel',
            icon: faDashboard,
            label: 'Dashboard'
        },
        {
            href: '/trucks',
            icon: faTruck,
            label: 'CEDIS'
        },
        {
            href: '/account',
            icon: faMap,
            label: 'Rutas'
        },
        {
            href: '/settings',
            icon: faCog,
            label: 'Ajustes'
        },
    ];
    
    return (
        <nav className={`${className} ${styles.sidebar}`}>
            <div className="container">
                <div className={styles.content}>
                    <h1>Bimbo</h1>
                    <ul>
                        {navLinks.map((navLink) => (
                            <li className={styles.buttons} key={navLink.href}>
                                <Link className={styles.buttons} href={navLink.href}>
                                    <FontAwesomeIcon icon={navLink.icon} className={styles.icon} />
                                    <span>{navLink.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.footer}>
                        <button className={styles.button}>Cerrar sesión</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;