import { weatherNotFound } from '../helpers/errorResponses';
import { City } from '../models';

export default {
  // busqueda case-insensitive de ciudad
  findCity: async (cityName: string) => {
    const cityResult = await City.findOne({
      name: new RegExp(cityName, 'i'),
    }).exec();
    if (!cityResult) {
      throw weatherNotFound;
    }
    const cityObj = cityResult.toObject();
    return cityObj;
  },
};
