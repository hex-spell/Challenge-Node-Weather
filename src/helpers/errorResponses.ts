export type WeatherAPIError = {
  cod: string;
  message: string;
};

export const weatherNotFound: WeatherAPIError = {
  cod: '404',
  message: 'city not found',
};

export const userNotFound: WeatherAPIError = {
  cod: '404',
  message: 'user not found',
};

export const userInvalidCredentials: WeatherAPIError = {
  cod: '400',
  message: 'invalid credentials',
};

export const userAlreadyExists: WeatherAPIError = {
  cod: '409',
  message: 'user already exists',
};

export const userValidation: WeatherAPIError = {
  cod: '400',
  message: 'email has to be valid, and password must be at least 5 chars long',
};

export const endpointNotFound: WeatherAPIError = {
  cod: '404',
  message: 'this endpoint does not exist',
};

export const unhandledServerError: WeatherAPIError = {
  cod: '500',
  message: 'unhandled server error',
};
