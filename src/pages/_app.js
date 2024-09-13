import React, { useEffect } from "react";

//import '@styles/globals.css';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css'; // Add this line

//import AppContext from '@context/AppContext';
import AppContext from '../context/AppContext';
import useInitialState from '@hooks/useInitialState';
import { SessionProvider } from 'next-auth/react';

export default function App({ session, Component, pageProps }) {

  const initialState = useInitialState();
  
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);
  

  return (
    <AppContext.Provider value={initialState}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
    </AppContext.Provider>
  )
}
