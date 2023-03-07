import React from  'react';
import stylesGlobal from '@styles/StylesGlobal.module.scss';
//import styles from '@styles/Welcome.module.scss';

const Welcome = () => {
	
	return (
		<section className={stylesGlobal['main-container']}>
			<div>
				Hola Cozy!!
			</div>
		</section>
	);
}

export default Welcome;
