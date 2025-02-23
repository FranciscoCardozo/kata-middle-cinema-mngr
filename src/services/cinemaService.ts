import { Request, Response } from 'express';
import DynamoService from './dynamoService/dynamo.service';
import constants from '../utils/constants';
import debugLib from 'debug';
import RequestCinemaDTO from '../models/requestCinemaDTO';

const debug = debugLib('cinema:service');
export default class CinemaService {
    public static async getMovies(req: Request, res: Response){
        try {
            debug('INIT TO: (getMovies):');
            console.log('Getting movies');
            const movies = await DynamoService.getItems(constants.dynamo.tables.moviesTable);
            res.status(200).send(movies);
        } catch (error) {
            res.status(500).send({message: 'Error getting movies', error});
        }
        
    }

    public static async registryMovie(req: Request, res: Response){
        try {
            const movieToSave = new RequestCinemaDTO(req.body);
            debug('INIT TO: (registryMovie): ', movieToSave);
            res.status(200).send({message: 'Movie registered'});
        } catch (error) {
            res.status(500).send({message: 'Error registering movie', error});
        }
    }
}