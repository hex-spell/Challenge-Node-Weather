import { City } from '../models';

export default {
  // busqueda case-insensitive de ciudad
  findCity: async (cityName: string) => {
    const cityResult = await City.findOne({
      name: new RegExp(cityName, 'i'),
    }).exec();
    const cityObj = cityResult?.toObject() || {};
    return cityObj;
  },
};
