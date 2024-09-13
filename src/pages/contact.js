import React from 'react';
import Header from '../components/Header';
import ContactForm from '@components/ContactForm'
import stylesGlobal from '@styles/StylesGlobal.module.scss';


export default function Contact() {
    return (
        <>
        <section className={stylesGlobal['main-container']}>
            <Header />
            <ContactForm />
        </section>
        </>
    );
}