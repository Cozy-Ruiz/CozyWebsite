import React from 'react';
import Header from '../components/Header';
import stylesGlobal from '@styles/StylesGlobal.module.scss';
import styles from '@styles/Welcome.module.scss';

export default function About() {
return (
    <>
    <section className={stylesGlobal['main-container']}>
        <Header />
        <div className={styles.container}>
			<div className="row justify-content-center  align-items-center" >	
				<div className="col-md-6 col-xxl-6 p-5">
					<section className="card-body text-left" style={{ color: "white", fontSize: "60px" }}>
						About me
					</section>
					
					<section className="card-body text-left" style={{ color: "white", fontSize: "16px" }}>
                        <p>Dedicated and efficient full stack developer with 12+ years experience in application layers, presentation layers, and databases.</p>
                        <p>I have a deep passion for web development and software development.</p><p>I am Certified in both frontend and backend technologies.</p>
                        <p>As i am mostly a self-learned, i can easy adapt to new things and always ready to take on a change seeking to further my abilities as full stack developer.</p>
					</section>

                    <section className="card-body text-left" style={{ color: "white", fontSize: "60px" }}>
                        Certifications
					</section>
					
					<section className="card-body text-left" style={{ color: "white", fontSize: "16px" }}>
                        <p>Full-Stack Web Development Certificate.</p>
					</section>

                    <section className="card-body text-left" style={{ color: "white", fontSize: "60px" }}>
                        Languages
					</section>
					
					<section className="card-body text-left" style={{ color: "white", fontSize: "16px" }}>
                        <p>* Spanish: Native Proficiency</p>
                        <p>* English: Speaking 60%, Written 70 % , Read 90 %</p>
					</section>
				</div>
			</div>
		</div>
    </section>
    </>
);
}