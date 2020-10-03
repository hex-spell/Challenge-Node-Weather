import { NextFunction, Response, Request } from 'express';
import { unauthorized } from '../helpers/errorResponses';
import apiKeysService from '../services/apiKeysService';

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
  } catch (err) {
    next(err);
  }
};
