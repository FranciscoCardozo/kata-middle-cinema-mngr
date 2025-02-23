import { Request, Response } from 'express';
import DynamoService from './dynamoService/dynamo.service';
import constants from '../utils/constants';
import debugLib from 'debug';
import RequestCinemaDTO from '../models/requestCinemaDTO';
import RequestRoomDTO from '../models/requestRoomDTO';

const debug = debugLib('cinema:service');
export default class CinemaService {
    public static async getMovies(req: Request, res: Response){
        try {
            debug('INIT TO: (getMovies):...');
            const movies = await DynamoService.getItems(constants.dynamo.tables.moviesTable);
            
            res.status(200).send(movies.items);
        } catch (error) {
            res.status(500).send({message: 'Error getting movies', error});
        }
        
    }

    public static async registryMovie(req: Request, res: Response){
        try {
            const movieToSave = new RequestCinemaDTO(req.body).getDynamoObject();
            debug('INIT TO: (registryMovie): ', movieToSave);
            await DynamoService.setItems(constants.dynamo.tables.moviesTable, movieToSave);
            res.status(200).send({message: 'Movie registered: ', movie: movieToSave.movie_id});
        } catch (error) {
            res.status(500).send({message: 'Error registering movie', error});
        }
    }

    public static async getRooms(req: Request, res: Response){
        try {
            debug('INIT TO: (getRooms):...');
            const rooms = await DynamoService.getItems(constants.dynamo.tables.rooms);
            res.status(200).send(rooms.items);
        } catch (error) {
            res.status(500).send({message: 'Error getting rooms', error});
        }
    }

    public static async registryRoom(req: Request, res: Response){
        try {
            debug('INIT TO: (registryRoom):...');
            const roomToSave = new RequestRoomDTO(req.body).getDynamoObject();
            debug('Room to save: ', roomToSave);
            await DynamoService.setItems(constants.dynamo.tables.rooms, roomToSave);
            res.status(200).send({message: 'Room registered: ', room: roomToSave.room_id});
        } catch (error) {
            res.status(500).send({message: 'Error registering room', error});
        }
    }
}