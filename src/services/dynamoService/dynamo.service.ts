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

    public static async updateRoomItems(tableName: string, body: any) {
        const params = {
            TableName: tableName,
            Key: {
                room_id: body['room_id'] 
            },
            UpdateExpression: 'SET room_reservations = :val1',
            ExpressionAttributeValues: {
                ':val1': body['room_reservations'],
            },
            ReturnValues: 'UPDATED_NEW'
        };
        const command = new UpdateItemCommand(params);
        return dynamoDb.send(command)
            .then((data: any) => data)
            .catch((error: any) => {
                console.log('Error updating item', error);
                return Promise.reject(error);
            });
    }
}