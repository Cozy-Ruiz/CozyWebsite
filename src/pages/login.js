import React from 'react';
import Header from '@components/Header';
import LoginForm from '@components/LoginForm';
import stylesGlobal from '@styles/StylesGlobal.module.scss';

export default function Contact() {

    return (
        <>
        <section className={stylesGlobal['main-container']}>
            <Header />
            <LoginForm />
        </section>
        </>
    );
}