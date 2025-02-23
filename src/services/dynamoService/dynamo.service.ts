const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
const dynamoDb = new DynamoDBClient({ region: 'us-east-1' });

export default class DynamoService {
    public static async getItems(tableName: string, key?:string) {
        try {
            const params = {
                TableName: tableName,
                Key: key ? {'PrimaryKey': key} : undefined
            };
            const command = new ScanCommand(params);
            return dynamoDb.send(command);
        } catch (e) {
            console.log(e);
        }
    }
}