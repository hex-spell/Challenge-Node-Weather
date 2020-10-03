import { Router } from 'express';
import weather from './weather';
import users from './users';
import apiKeys from './apiKeys';

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.send('Rutas funcionando');
});

mainRouter.use('/weather', weather);
mainRouter.use('/users', users);
mainRouter.use('/apikeys', apiKeys);

export default mainRouter;
