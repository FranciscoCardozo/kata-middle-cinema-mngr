import { Request, Response } from 'express';
export default class CinemaService {
    public static getMovies(req: Request, res: Response){
        console.log('Getting movies');
    }
}