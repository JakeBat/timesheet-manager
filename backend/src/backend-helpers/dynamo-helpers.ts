import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { Insight, DynamoInsight } from '../shared';
import createResponse from '../shared/generate-response';
import { dynamoInsightToInsight } from '../shared/dynamo-conversions';
import { DynamoDB, AWSError } from 'aws-sdk';


export const dynamoDb = new DynamoDB();
export const createDynamodbObject:any  = DynamoDB.Converter.marshall;
export const parseDynamodbObject:any = DynamoDB.Converter.unmarshall;
export const TableName = 'timesheet'

export function getItem<T>(params):Promise<T> {
    return new Promise((res,err) =>{
        const dynamoParams:DynamoDB.Types.GetItemInput = {TableName, Key:{...createDynamodbObject(params)}}
        dynamoDb.getItem(dynamoParams, (error, response) => {
            checkError(error);
            if(!response || !response.Item) {
                return res(null)
            }
            return res(parseDynamodbObject(response.Item));
        });
    })
}

export function query<T>(dynamoDbParams):Promise<T[]> {
    dynamoDbParams.TableName = TableName;
    return new Promise((res, err) => {
        dynamoDb.query(dynamoDbParams, (error, response) => {
            checkError(error);
            if(!response.Items) {
                return res(null)
            }
            return res(response.Items.map(parseDynamodbObject));
        });
    });
}

export function batchWriteItems(requestItems) {
    return new Promise((res, err) => {
        const dynamodbParams = {
            RequestItems:{
                [TableName]:requestItems
            }
        }
        dynamoDb.batchWriteItem(dynamodbParams, (error, data) => {
            checkError(error);
            return res(data);
        })
    })
}

export function putItem(item):Promise<void>{
    return new Promise((res,err) =>{
        const dynamoParams:DynamoDB.Types.PutItemInput = {TableName, Item:createDynamodbObject(item)}
        dynamoDb.putItem(dynamoParams, (error, response) => {
            checkError(error);
            return res();
        });
    })
}

export function createPutRequest(item) {
    return {
        PutRequest: {
            Item:createDynamodbObject(item)
        }
    }
}

export function createDeleteRequest(item) {
    return {
        DeleteRequest: {
            Key:createDynamodbObject(item)
        }
    }
}

function checkError(error) {
    if(error) {
        console.error(error)
    }
}
export const personId = '4'

