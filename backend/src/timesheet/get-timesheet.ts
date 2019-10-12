import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { Timesheet, } from '../shared';
import createResponse from '../shared/generate-response';
import { getItem, personId, getUserId } from '../backend-helpers';
import * as moment from 'moment';

export const handler:Handler = async (event: APIGatewayEvent, context:Context, response:Callback) => {
    const date = event.queryStringParameters.date;
    const userId = getUserId();
    if(date) {
        return createResponse(400, 'date is a required query parameter')
    }
    if(!moment(date).isValid()) {
        return createResponse(400, `date must be provided yyyy-mm-dd. date that was recieved ${date}`)
    }
    let timesheet = await getItem<Timesheet>({userId:getUserId(), date});
    if(timesheet === null){
        timesheet = {
            userId,
            date,
            timesheetEntries:[]
        }
    }
    return createResponse(200, timesheet);
}