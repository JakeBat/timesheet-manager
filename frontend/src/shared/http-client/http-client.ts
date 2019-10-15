import axios from 'axios';
import { Auth } from 'aws-amplify';

export const getAccessToken = () => {
    return Auth.currentSession().then((data) => data.getAccessToken().getJwtToken())
}
export const baseUrl = 'http://localhost:3001/timesheet'

const httpRequest = (type) => {

    return async (restOfUrl, body?) => {
        const headers = {headers:{authorization:await getAccessToken()}};

        const response =  await axios[type](`${baseUrl}${restOfUrl}`, type === 'get' ? headers : body, headers);
        return response.data;
    }
}

export const get = httpRequest('get');
export const post = httpRequest('post');

