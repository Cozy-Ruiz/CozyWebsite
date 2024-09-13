import axios from 'axios';
import endPoints from '@services/api';

const config = {
    headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    withCredentials: false,
    crossDomain: true
}

const doContact = async (body) => {
    console.log(body);
    
    const response = await axios.post(endPoints.auth.contact, body, config);
    return response.data;
    
}

export { doContact };
