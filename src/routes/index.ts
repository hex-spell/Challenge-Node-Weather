import { Router } from 'express';
import weather from './weather';
import cities from './cities';

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.send('Rutas funcionando');
});

mainRouter.use('/weather', weather);
mainRouter.use('/cities', cities);

export default mainRouter;
