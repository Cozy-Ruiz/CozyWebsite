import '../styles/globals.css';
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'; // Add this line
import { useEffect } from "react";

//import Header from '../components/Header';
import AppCOntext from '@context/AppContext';
import useInitialState from 'hooks/useInitialState';

export default function App({ Component, pageProps }) {
  const initialState = useInitialState();

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);
  
  return (
    <AppCOntext.Provider value={initialState}>
      <Component {...pageProps} />
    </AppCOntext.Provider>
  ) 
}
