export type WeatherAPIError = {
  cod: string;
  message: string;
};

export const weather404: WeatherAPIError = {
  cod: '404',
  message: 'city not found',
};
