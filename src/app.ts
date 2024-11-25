import express, {
  Application,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import globalErrorHandler from './app/miiddlwares/globalErrorHandler';
import notFound from './app/miiddlwares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 'Api Running';
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler as unknown as ErrorRequestHandler);

app.use(notFound as unknown as express.RequestHandler);

export default app;
