import React from 'react';
import Header from '../components/Header';
import RegisterForm from '@components/RegisterForm';
import stylesGlobal from '@styles/StylesGlobal.module.scss';


export default function Contact() {
    return (
        <>
        <section className={stylesGlobal['main-container']}>
            <Header />
            <div>bienvenido</div>
        </section>
        </>
    );
}