import { Request, Response } from 'express';
import DynamoService from './dynamoService/dynamo.service';
import constants from '../utils/constants';
import debugLib from 'debug';
import RequestCinemaDTO from '../models/requestCinemaDTO';
import RequestRoomDTO from '../models/requestRoomDTO';
import RequestConfirmDTO from '../models/requestConfirmDTO';
import UtilsValidations from '../utils/utilsValidations';

const debug = debugLib('cinema:service');
export default class CinemaService {
    public static async getMovies(req: Request, res: Response){
        try {
            debug('INIT TO: (getMovies):...');
            const movies = await DynamoService.getItems(constants.dynamo.tables.moviesTable);
            
            res.status(200).send(movies.Items);
        } catch (error) {
            res.status(500).send({message: 'Error getting movies', error});
        }
        
    }

    public static async registryMovie(req: Request, res: Response){
        try {
            const movieToSave = new RequestCinemaDTO(req.body).getDynamoObject();
            debug('INIT TO: (registryMovie): ', movieToSave);
            await DynamoService.setItems(constants.dynamo.tables.moviesTable, movieToSave);
            res.status(200).send({message: 'Movie registered: '});
        } catch (error) {
            res.status(500).send({message: 'Error registering movie', error});
        }
    }

    public static async getRooms(req: Request, res: Response){
        try {
            debug('INIT TO: (getRooms):...');
            const rooms = await DynamoService.getItems(constants.dynamo.tables.rooms);
            res.status(200).send(rooms.Items);
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
            res.status(200).send({message: 'Room registered: ', room: roomToSave});
        } catch (error) {
            res.status(500).send({message: 'Error registering room', error});
        }
    }

    public static async getReservations(req: Request, res: Response){
        try {
            debug('INIT TO: (getReservations):...');
            const roomsList = await DynamoService.getItems(constants.dynamo.tables.rooms);
            const reservations = UtilsValidations.mapReservationsList(roomsList.Items);
            res.status(200).send(reservations);
        } catch (error) {
            res.status(500).send({message: 'Error getting reservations', error});
        }
    }

    public static async confirmReservation(req: Request, res: Response){
        try {
            debug('INIT TO: (confirmReservation):...');
            const customBody = UtilsValidations.mapCustomBody(req.body);
            const roomData = await DynamoService.getItems(constants.dynamo.tables.rooms, {'room_id': req.body.roomId});
            console.log('ROOM DATA', roomData.Items);
            const reservationToSave = new RequestConfirmDTO(req.body).getDynamoObject();
            const updateReservations = new RequestRoomDTO(customBody).getDynamoObject();
            const fullObject = {
                ...updateReservations,
                ...roomData.Items
            };
            console.log('UPDATE BODY', fullObject);
            console.log('RESERV BODY', reservationToSave);
            await DynamoService.setItems(constants.dynamo.tables.requestTable, reservationToSave);
            await DynamoService.setItems(constants.dynamo.tables.rooms, fullObject);
            res.status(200).send({message: 'Reservation confirmed'});
        } catch (error) {
            res.status(500).send({message: 'Error confirming reservation', error});
        }
    }
}