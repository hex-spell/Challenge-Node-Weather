import { NextFunction, Response, Router } from 'express';
import { jwtSecret } from '../../services/usersService';
import apiKeysService from '../../services/apiKeysService';
import { Request } from 'express-validator/src/base';
import { param, validationResult } from 'express-validator';
import expressJwt from 'express-jwt';
import { badRequest, unauthorized } from '../../helpers/errorResponses';

const apiKeys = Router();

apiKeys.use(expressJwt({ secret: jwtSecret, algorithms: ['HS256'] }));

apiKeys.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await apiKeysService.createApiKey(req.user.sub);
    res.send(response);
  } catch (err) {
    next(err);
  }
});
apiKeys.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await apiKeysService.getApiKeysByUserId(req.user.sub);
    res.send(response);
  } catch (err) {
    next(err);
  }
});
apiKeys.delete(
  '/:id',
  [param('id').isString()],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty() || !req.params?.id) {
        throw badRequest;
      }
      const apiKeyToDelete = await apiKeysService.getApiKeyById(req.params.id);
      // si el apikey no esta vinculada al user que hace el request, retorna unauthorized
      if (apiKeyToDelete.userId !== req.user.sub) {
        throw unauthorized;
      }
      const response = await apiKeysService.deleteApiKeyById(req.params.id);
      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);

export default apiKeys;
