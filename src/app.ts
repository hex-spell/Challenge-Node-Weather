import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
// cors permitir a todos
app.use(cors({ origin: '*' }));
app.use(routes);

export default app;
