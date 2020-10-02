import { Router } from 'express';
import weather from './weather';
import users from './users';

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.send('Rutas funcionando');
});

mainRouter.use('/weather', weather);
mainRouter.use('/users', users);

export default mainRouter;
