import { City } from '../models/City';
import weatherDescriptionsList from './weatherDescriptionsList';

// tslint:disable-next-line: max-line-length
// funcion sacada de https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
// retorna un numero entero al azar desde un intervalo
const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// retorna un objeto con la misma estructura que la api de openweather,
// con variables de clima al azar
export const weatherObjFactory = (city: City) => ({
  coord: {
    lon: city.lng,
    lat: city.lat,
  },
  // obtiene un elemento al azar del arreglo de descripciones de clima
  weather: [
    weatherDescriptionsList[
      Math.floor(Math.random() * weatherDescriptionsList.length)
    ],
  ],
  base: '',
  main: {
    temp: randomIntFromInterval(0, 313),
    feels_like: randomIntFromInterval(0, 313),
    temp_min: randomIntFromInterval(0, 313),
    temp_max: randomIntFromInterval(0, 313),
    pressure: randomIntFromInterval(980, 1020),
    humidity: randomIntFromInterval(0, 100),
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: city.country,
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: city.name,
  cod: 0,
});
