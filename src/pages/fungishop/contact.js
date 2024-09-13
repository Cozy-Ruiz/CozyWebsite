import * as React from 'react';
import FungiAppBar from '@components/fungishop/FungiAppBar';
import ContactForm from '@components/ContactForm';
import FungiFooter from '@components/fungishop/FungiFooter';

const Contact = () => {

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', height: '100%' }}>
            <FungiAppBar/>
            <ContactForm color='black'/>
            <FungiFooter/>
        </div>
    );
}

export default Contact;