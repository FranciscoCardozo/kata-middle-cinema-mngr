import express, { NextFunction, Response, Request } from 'express'; // NOSONAR
import logger from 'morgan';
import path from 'path';
import cinemaController from './controllers/cinemaController';
import config from './config';

const app = express();
app.disable('x-powered-by');
const apiPath = config.apiPath;
const fullApiPathV1 = `/V1/Product/cinema`;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, '../static')));

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`Petición recibida: ${req.method} ${req.originalUrl}`);
	next();
  });

app.use((_, res: Response, next: NextFunction) => {
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use(cinemaController);

export default app;
