import { Router } from 'express';
import citiesService from '../../services/citiesService';

const cities = Router();

cities.get('/', async (req, res) => {
  res.send('Cities endpoint working');
});

cities.get('/find', async (req, res) => {
  const cityName = req.query.name?.toString() || '';
  const result = await citiesService.findCity(cityName);
  res.send(result);
});

export default cities;
