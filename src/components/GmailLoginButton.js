import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
//import { GoogleLogin } from 'react-google-login';
//import { gapi } from 'gapi-script';
//import { loadGapiScript } from '../services/api/gapiLoader';
import axios from 'axios';

import { signIn, getSession } from 'next-auth/react';


const GmailLoginButton = () => {

    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
        const session = await getSession();

        if (session) {
            router.replace('/home'); // Redirige a la página de inicio después de iniciar sesión
        }
        };

        checkSession();
    }, []);

    const handleGoogleSignIn = () => {
        signIn('google');
    };

    return (
        <div>
        <button onClick={handleGoogleSignIn}>Iniciar sesión con Google</button>
        </div>
    );

    //const router = useRouter();

    /*
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: "75307055575-584i465q3e4thpn4bq7pcshcdjjnugqe.apps.googleusercontent.com",
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);
    */

    /*
    useEffect(() => {
        const initializeGapi = async () => {
            await loadGapiScript();
            window.gapi.client.init({
                clientId: '75307055575-584i465q3e4thpn4bq7pcshcdjjnugqe.apps.googleusercontent.com',
                scope: 'email',
            });
            
        };
    
        initializeGapi();
      }, []);
      */

    
    //const config = {
    //    headers: {
    //       accept: '*/*',
    //        'Content-Type': 'application/json',
    //    },
    //    withCredentials: true,
    //    crossDomain: true
    //}

    /*
    const onSuccess = (response) => {
        console.log('Autenticación exitosa');
        console.log(response);

        const data = {
          "token": response.tokenId
        }

        //axios.post('http://localhost:8000/api/authentication/verifyGoogleToken', data, config)
        //axios.post('http://localhost:8000/apiClient/rest-auth/google-login/', data, config)
        axios.post('https://python.cozy-corporation.com/api/authentication/createUserByToken', data, config)
        .then(response => {
            console.log(response.data);
            
            if(response.data.id){
                router.push("/home");
            }else{
                router.push("/error");
            }
            
        })
        .catch(error => {
            console.error(error);
            router.push("/error");
        });
    };

    const onFailure = (error) => {
        console.error('Error al autenticar con Google', error);
        // Aquí puedes manejar la respuesta de la autenticación fallida
        router.push("/error");
    };

    return (
        
        <div>
            <GoogleLogin
                clientId="75307055575-584i465q3e4thpn4bq7pcshcdjjnugqe.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            /> 
        </div>
        
    );
    */
};

export default GmailLoginButton;
