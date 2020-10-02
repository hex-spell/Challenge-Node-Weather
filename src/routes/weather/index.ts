import { Router } from 'express';
import citiesService from '../../services/citiesService';
import { weatherObjFactory } from '../../helpers/weatherHelpers';
import { weatherNotFound } from '../../helpers/errorResponses';

const weather = Router();

weather.get('/', async (req, res) => {
  const cityName = req.query.q?.toString() || '';
  const result = await citiesService.findCity(cityName);
  if (result) {
    const weatherObj = weatherObjFactory(result);
    res.send(weatherObj);
  } else {
    res.status(404).send(weatherNotFound);
  }
});

export default weather;
