import React from  'react';
import styles from '@styles/Welcome.module.scss';

import Image from 'next/image';
import pngwing from '@img/pngwing.png';
import photo from '@img/photo.png'

const Welcome = () => {
	
	return (
		<div className={styles.container}>
			<div className="row justify-content-center  align-items-center" >	
				<div className="col-md-6 col-xxl-4 p-5">
					<section className="card-body text-left" style={{ color: "white", fontSize: "60px" }}>
						Let's start something big together
					</section>
					
					<section className="card-body text-left" style={{ color: "white", fontSize: "16px" }}>
						Dedicated and efficient full stack developer with 12+ years experience in application layers, presentation layers, and databases.
					</section>
				</div>

				<div className="col-md-6 col-xxl-4">
					<div className="card" style={{ backgroundColor: "transparent"}}>
						<div className="card-body">
							<div className={styles.photoSquare}>
								<Image src={photo} alt="photo" className={styles.photo} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Welcome;
