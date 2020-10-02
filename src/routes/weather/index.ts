import { Router } from 'express';
import citiesService from '../../services/citiesService';
import { weatherObjFactory } from '../../services/weatherHelpers';

const weather = Router();

weather.get('/', async (req, res) => {
  const cityName = req.query.q?.toString() || '';
  const result = await citiesService.findCity(cityName);
  const weatherObj = weatherObjFactory(result);
  res.send(weatherObj);
});

export default weather;
