import { Request, Response } from 'express';
import DynamoService from './dynamoService/dynamo.service';
import constants from '../utils/constants';
export default class CinemaService {
    public static async getMovies(req: Request, res: Response){
        try {
            console.log('Getting movies');
            const movies = await DynamoService.getItems(constants.dynamo.tables.moviesTable);
            res.status(200).send(movies);
        } catch (error) {
            res.status(500).send({message: 'Error getting movies'});
        }
        
    }
}