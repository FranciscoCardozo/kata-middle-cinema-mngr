import express, { NextFunction, Response } from 'express'; // NOSONAR
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
app.use(express.static(path.join(__dirname, '../static')));

app.use((_, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*'); // NOSONAR
	res.header('Access-Control-Allow-Headers', '*'); // NOSONAR
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use(fullApiPathV1, cinemaController);

export default app;
