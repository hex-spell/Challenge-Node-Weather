import { City } from '../models';

export default {
  // busqueda case-insensitive de ciudad
  findCity: async (cityName: string) => {
    try {
      const cityResult = await City.findOne({
        name: new RegExp(cityName, 'i'),
      }).exec();
      const cityObj = cityResult?.toObject() || null;
      return cityObj;
    } catch (err) {
      throw new Error(`Error in citiesService, findCity: ${err}`);
    }
  },
};
