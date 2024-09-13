import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MenuUser from './MenuUser';
import MenuNav from './MenuNav';
import menu from '@icons/icon_menu.svg';
import logo from '@logos/LogoCWS.png';
//import AppContext from '@context/AppContext';
//import shoppingCart from '@icons/icon_shopping_cart.svg';
import user from '@icons/icon_user.png';
import styles from '@styles/Header.module.scss';

import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
	const { data: session, status } = useSession()

	const [toggleMenu, setToggleMenu] = useState(false);
	const [toggleUser, setToggleUser] = useState(false);
	//const { state } = useContext(AppContext);

	const handleToggleMenu = () => {
		setToggleMenu(!toggle);
	}

	const handleToggleUser = () => {
		setToggleUser(!toggle);
	}

	return (
		<>
		<nav className={styles.nav}>
			<Image src={menu} alt="menu" className={styles.menu} onClick={() => setToggleMenu(!toggleMenu)}/>
			<div className={styles['navbar-left']}>
				<Link href="/" >
					<Image src={logo} alt="logo" className={styles['nav-logo']} />
				</Link>
				
				<MenuNav/>
			</div>
			<div className={styles['navbar-right']}>
				<ul>
					
					<li className={styles['navbar-email']}>
						{session && session.user && session.user.name}
					</li>
					
					<li className={styles['navbar-shopping-cart']} onClick={() => setToggleUser(!toggleUser)}>
						<Image style={{width: '25px', height: '25px'}} src={user} alt="user" />
					</li>
				</ul>
			</div>
		</nav>
		{toggleMenu && <MenuNav />}
		{toggleUser && <MenuUser />}
		</>
	);
}

export default Header;