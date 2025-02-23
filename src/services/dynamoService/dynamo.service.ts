const { DynamoDBClient, ScanCommand, PutItemCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb');
const dynamoDb = new DynamoDBClient({ region: 'us-east-1' });

export default class DynamoService {
    public static async getItems(tableName: string, key?:string) {
        const params = {
            TableName: tableName,
            Key: key ? {'PrimaryKey': key} : undefined
        };
        const command = new ScanCommand(params);
        return dynamoDb.send(command)
        .then((data: any) => data)
        .catch((error: any) => {
            throw new Error(error)
        });
    }

    public static async setItems(tableName: string, body?:any) {
        const params = {
            TableName: tableName,
            Item: body
        };
        const command = new PutItemCommand(params);
        return dynamoDb.send(command)
        .then((data: any) => data)
        .catch((error: any) => {
            console.log('Error saving item', error);
            throw new Error(error)
        });
    }

    public static async updateItems(tableName: string, primaryKeyName: string, body: { [key: string]: any }) {
        try {
            const key = { [primaryKeyName]: { S: body[primaryKeyName] } };
            delete body[primaryKeyName];

            const attributes = body;

            const updateExpression = 'SET ' + Object.keys(attributes).map(attr => `#${attr} = :${attr}`).join(', ');
            const expressionAttributeNames = Object.keys(attributes).reduce((acc, attr) => {
                (acc as any)[`#${attr}`] = attr;
                return acc;
            }, {});
            const expressionAttributeValues = Object.keys(attributes).reduce((acc, attr) => {
                const value = attributes[attr];
                if (typeof value === 'string') {
                    (acc as any)[`:${attr}`] = { S: value };
                } else if (typeof value === 'number') {
                    (acc as any)[`:${attr}`] = { N: value.toString() };
                } else if (Array.isArray(value)) {
                    (acc as any)[`:${attr}`] = { L: value.map(v => ({ N: v.toString() })) };
                } else {
                    (acc as any)[`:${attr}`] = { S: value.toString() };
                }
                return acc;
            }, {});

            const params = {
                TableName: tableName,
                Key: key,
                UpdateExpression: updateExpression,
                ExpressionAttributeNames: expressionAttributeNames,
                ExpressionAttributeValues: expressionAttributeValues
            };
            const command = new UpdateItemCommand(params);
            return dynamoDb.send(command)
                .then((data: any) => data)
                .catch((error: any) => {
                    console.log('Error updating item', error);
                    return Promise.reject(error);
                });
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
}