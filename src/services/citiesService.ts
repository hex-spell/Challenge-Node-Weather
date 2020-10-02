import { City } from "../models";

export default {
  // busqueda case-insensitive de ciudad
  findCity: async (cityName: string) => {
    return await City.findOne({ name: new RegExp(cityName, "i") }).exec();
  },
};
