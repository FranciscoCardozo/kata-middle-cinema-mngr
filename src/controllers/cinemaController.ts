import { Router, Request, Response } from 'express';
import OpenApiValidatorProvider from '../utils/openApiValidator';
import CinemaService from '../services/cinemaService';
const cinemaController = Router();

const validator = OpenApiValidatorProvider.getValidator();
const routeToValidate = '/v1/product/cinema';

cinemaController.get(`${routeToValidate}/movies/retrieve`,
 async (req: Request, res: Response) => {
    CinemaService.getMovies(req, res); 
});

cinemaController.post(`${routeToValidate}/movies/registry`,
    async (req: Request, res: Response) => {
       CinemaService.registryMovie(req, res); 
});

cinemaController.get(`${routeToValidate}/rooms/retrieve`,
    async (req: Request, res: Response) => {
       CinemaService.getRooms(req, res); 
});

cinemaController.post(`${routeToValidate}/rooms/registry`,
    async (req: Request, res: Response) => {
       CinemaService.registryRoom(req, res); 
});

cinemaController.get(`${routeToValidate}/reservations/retrieve`,
    async (req: Request, res: Response) => {
       CinemaService.getReservations(req, res); 
});

cinemaController.post(`${routeToValidate}/reservations/schedule`,
    async (req: Request, res: Response) => {
       CinemaService.confirmReservation(req, res); 
});

export default cinemaController;