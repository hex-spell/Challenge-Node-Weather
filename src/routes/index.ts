import { Router } from 'express';
import weather from './weather';
import cities from './cities';

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.send('App and routes working');
});

mainRouter.use('/weather', weather);
mainRouter.use('/cities', cities);

export default mainRouter;
