const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export default class DynamoService {
    public static async getItems(tableName: string, key?:string) {
        const params = {
            TableName: tableName,
            Key: key ? {'PrimaryKey': key} : undefined
        };
        return dynamoDb.scan(params).promise();
    }
}