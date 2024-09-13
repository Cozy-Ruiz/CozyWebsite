import React from "react";
import Link from "next/link";
import styles from '@styles/Menu.module.scss';

const MenuNav = () => {
    return (
        //<div className={styles.MenuNav}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        //</div>
    );
}

export default MenuNav;