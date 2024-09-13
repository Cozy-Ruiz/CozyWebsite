import NextAuth from 'next-auth';
//import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";


const options = {
    theme: 'ligth',
    debug: true,
    session: {
        jwt: true,
        maxAge: 60 * 15,
    },
    jwt: {
        secret: process.env.AUTH_JWT_SECRET,
        signingkey: process.env.AUTH_JWT_SIGNING_KEY,
        encryption: true,
        encryptionkey: process.env.AUTH_JWT_ENCRYPTION_KEY,
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              //username: { label: "Username", type: "text", placeholder: "jsmith" },
              email:{ label: 'Mail', type: 'text'},
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const res = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/users/auth/login/`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'content-type': 'application/json' }
                })
                
                const user = await res.json()

                if(res.ok && user){
                    console.log(user);
                    return { accessToken: user.access };
                } else {
                    return null
                }
            }
        }),
        // Puedes agregar otros proveedores de autenticación aquí
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider === "google") {
                if (account && account.access_token) {
                    // Enviar el access_token al backend
                    
                    const response = await fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/dj-rest-auth/googleAuthentication/`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: account.id_token,
                        }),
                    });

                    const data = await response.json();
                    
                    token.accessToken = data.access;
                }
            }else{
                if (user) {
                    token.accessToken = user.accessToken;
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    
}

export default NextAuth(options)


{/*

        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code id_token token", // Incluye todos los tipos de respuesta
                nonce: "random-nonce-value", // Agrega un nonce si es necesario
            }
        }



        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },



        ,
        async redirect({ url, baseUrl }) {
            // Redirigir a la API route que maneja la captura de los tokens y el code
            return `${baseUrl}/api/auth/callback/google?${new URL(url).searchParams.toString()}`;
        }





        pages/api/auth/callback/google.js
        export default async (req, res) => {
            //console.log("Req_cozy " + req)
            const { code } = req.query;
        
            if (!code) {
            return res.status(400).json({ error: 'Missing required parameters' });
            }

            console.log(code);
            
            // Aquí puedes enviar los tres parámetros al backend
            const backendResponse = await fetch('http://localhost:8000/dj-rest-auth/google/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code
            }),
            });
        
            const data = await backendResponse.json();
        
            if (backendResponse.ok) {
            // Redirige al usuario a la página que deseas después de la autenticación
            return res.redirect('/success');
            } else {
            return res.status(500).json(data);
            }
            

            return res.redirect('/success');
        };
*/}


