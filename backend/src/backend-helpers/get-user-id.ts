import { APIGatewayProxyEvent } from "aws-lambda";

export function getUserId(event:APIGatewayProxyEvent) {
    if(!event.headers.authorization) {
        throw Error('authorization needed')
    }
    return JSON.parse(Buffer.from(event.headers.authorization.split('.')[1], 'base64').toString()).username;
}