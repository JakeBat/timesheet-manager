import axios from 'axios';
import { Auth } from 'aws-amplify';

export const getAccessToken = () => {
    return Auth.currentSession().then((data) => data.getAccessToken().getJwtToken())
}
export const baseUrl = 'http://localhost:3001'

const httpRequest = (type) => {

    return async (url, body) => {
        const headers = {headers:{authorization:await getAccessToken()}};

        const response =  await axios[type](url, type === 'get' ? headers : body, headers);
        return response.data;
    }
}

export const get = httpRequest('get');
export const post = httpRequest('post');

