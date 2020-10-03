import { NextFunction, Response, Router } from 'express';
import apiKeysService from '../../services/apiKeysService';
import { Request } from 'express-validator/src/base';

const apiKeys = Router();

apiKeys.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await apiKeysService.createApiKey(1);
    res.send(response);
  } catch (err) {
    next(err);
  }
});
apiKeys.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await apiKeysService.createApiKey(1);
      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);

export default apiKeys;
