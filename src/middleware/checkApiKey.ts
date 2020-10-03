import { NextFunction, Response, Request } from 'express';
import { unauthorized } from '../helpers/errorResponses';
import apiKeysService from '../services/apiKeysService';

// middleware que valida el apikey, en el parametro appid, como lo hace openweather
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.query.appid || typeof req.query.appid !== 'string') {
      throw unauthorized;
    }
    const key = req.query.appid;
    const exists = await apiKeysService.exists(key);
    if (!exists) {
      throw unauthorized;
    }
    next();
  } catch (err) {
    next(err);
  }
};
