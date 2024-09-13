//import { NextApiHandler } from "next"

function credentialsAuth (request, response){

    if(request.method !== 'POST'){
        response.status(405).end()
        return
    }

    if(request.body.password === process.env.AUTH_SECRET){
        
        const websiteUser= {
            name: 'cozy',
            email: 'cozy@gmail.com',
            image: ''
        }
        
        
        {/*
        const websiteUser = fetch(`${process.env.NEXT_PUBLIC_COZYSHOP_HOSTNAME}/apiClient/users/auth/login/`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'content-type': 'application/json' }
        })
        */}

        return response.status(200).json(websiteUser)
    }

    response.status(401).end()
}

export default credentialsAuth