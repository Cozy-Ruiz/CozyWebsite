import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '@components/Menu';
import MyOrder from '@containers/MyOrder'
import menu from '@icons/icon_menu.svg';
import logo from '@logos/LogoCWS.png';
import AppContext from '@context/AppContext';
import shoppingCart from '@icons/icon_shopping_cart.svg';
import styles from '@styles/Header.module.scss';

const Header = () => {
	const [toggle, setToggle] = useState(false);
    const [toggleOrders, setToggleOrders] = useState(false);
	const { state } = useContext(AppContext);

	const handleToggle = () => {
		setToggle(!toggle);
	}

	return (
		<nav className={styles.nav}>
			<Image src={menu} alt="menu" className={styles.menu} />
			<div className={styles['navbar-left']}>
				<Link href="/" >
					<Image src={logo} alt="logo" className={styles['nav-logo']} />
				</Link>
				<ul>
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/about">About</Link>
					</li>
					<li>
						<Link href="/projects">Projects</Link>
					</li>
					<li>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</div>
			<div className={styles['navbar-right']}>
				<ul>
					<li className={styles['navbar-email']} onClick={handleToggle}>
						cozy-corporation.com
					</li>
					
					<li className={styles['navbar-shopping-cart']} onClick={() => setToggleOrders(!toggleOrders)}>
						<Image src={shoppingCart} alt="shopping cart" />
						{state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
					</li>
					
				</ul>
			</div>
			{toggle && <Menu />}
            {toggleOrders && <MyOrder />}
		</nav>
	);
}

export default Header;