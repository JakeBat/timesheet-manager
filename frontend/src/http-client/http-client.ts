import axios from 'axios';
import {Auth} from 'aws-amplify';

export const getAccessToken = () => {
    return Auth.currentSession().then((data) => data.getAccessToken().getJwtToken())
};

export const baseUrl = 'https://qwqhkkj8dc.execute-api.us-west-2.amazonaws.com/dev/timesheet';

const httpRequest = (type) => {

    return async (restOfUrl, body?) => {
        const headers = {headers: {Authorization: await getAccessToken()}};
        if (body) {
            body.timesheetEntries.forEach(entry => {
                entry.startTime = entry.startTime ? entry.startTime : null;
                entry.endTime = entry.endTime ? entry.endTime : null;
                entry.issue = entry.issue ? entry.issue : null;
                entry.comment = entry.comment ? entry.comment : null;
            })
        }
        const response = await axios[type](`${baseUrl}${restOfUrl}`, type === 'get' ? headers : body, headers);
        console.log(response);
        return response.data;
    }
};

export const get = httpRequest('get');
export const post = httpRequest('post');

