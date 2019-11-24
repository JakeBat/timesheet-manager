import { APIGatewayProxyEvent } from "aws-lambda";

export function getUserId(event:APIGatewayProxyEvent) {
    console.log('event', event)
    if(!event.headers.Authorization) {
        throw Error('authorization needed')
    }
    return JSON.parse(Buffer.from(event.headers.Authorization.split('.')[1], 'base64').toString()).username;
}