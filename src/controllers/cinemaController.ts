import { Router, Request, Response } from 'express';
import OpenApiValidatorProvider from '../utils/openApiValidator';
import CinemaService from '../services/cinemaService';
const cinemaController = Router();

const validator = OpenApiValidatorProvider.getValidator();
const routeToValidate = 'v1/product/cinema';

cinemaController.get('/v1/product/cinema/movies/retrieve',
 async (req: Request, res: Response) => {
    CinemaService.getMovies(req, res); 
});

export default cinemaController;