import React from 'react';
import Header from '../components/Header';
import stylesGlobal from '@styles/StylesGlobal.module.scss';
import styles from '@styles/Welcome.module.scss';
import Link from 'next/link';

export default function Projects() {
    return (
        <>
        <section className={stylesGlobal['main-container']}>
            <Header />
            <div className={styles.container}>
                <div className="row justify-content-center  align-items-center" >	
                    <div className="col-md-6 col-xxl-6 p-5">

                        <section className="card-body text-left" style={{ color: "white", fontSize: "60px" }}>
                            Fungi Shop
                        </section>
                        
                        <section className="card-body text-left" style={{ color: "white", fontSize: "16px" }}>
                            <Link href="/fungishop">
                                Fungi Shop
                            </Link>
                        </section>

                        <section className="card-body text-left" style={{ color: "white", fontSize: "60px" }}>
                            Shop
                        </section>
                        
                        <section className="card-body text-left" style={{ color: "white", fontSize: "16px" }}>
                            <Link href="https://next-shop-zeta-nine.vercel.app/">
                                https://next-shop-zeta-nine.vercel.app/
                            </Link>
                        </section>

                        <section className="card-body text-left" style={{ color: "white", fontSize: "60px" }}>
                            Shop Admin
                        </section>
                        
                        <section className="card-body text-left" style={{ color: "white", fontSize: "16px" }}>
                            <Link href="https://next-shop-admin-omega.vercel.app/">
                                https://next-shop-admin-omega.vercel.app/
                            </Link>
                        </section>

                        <section className="card-body text-left" style={{ color: "white", fontSize: "60px" }}>
                            Landing page
                        </section>
                        
                        <section className="card-body text-left" style={{ color: "white", fontSize: "16px" }}>
                            <Link href="https://candid-cupcake-b7190b.netlify.app/">
                            https://candid-cupcake-b7190b.netlify.app/
                            </Link>
                        </section>
                    </div>
                </div>
		    </div>
        </section>
        </>
    );
    }