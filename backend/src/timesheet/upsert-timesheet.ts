import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { Insight, Timesheet } from '../shared';
import createResponse from '../shared/generate-response';
import { getItem, personId, getUserId, putItem } from '../backend-helpers';
import { dynamoInsightToInsight } from '../shared/dynamo-conversions';

export const handler:Handler = async (event: APIGatewayEvent, context:Context, response:Callback) => {
    if(!event.body) {
        return createResponse(400, 'Missing body off post request')
    }
    const timesheet = JSON.parse(event.body);
    timesheet.userId = getUserId();
    await putItem(timesheet);
    return createResponse(200, timesheet);
}