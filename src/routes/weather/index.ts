import { Router } from 'express';
import citiesService from '../../services/citiesService';
import { weatherObjFactory } from '../../helpers/weatherHelpers';
import checkApiKey from '../../middleware/checkApiKey';

const weather = Router();

weather.get('/', checkApiKey, async (req, res) => {
  const cityName = req.query.q?.toString() || '';
  const result = await citiesService.findCity(cityName);
  const weatherObj = weatherObjFactory(result);
  res.send(weatherObj);
});

export default weather;
