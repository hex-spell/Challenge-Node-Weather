import { NextFunction, Response, Router } from 'express';
import usersService, { jwtSecret } from '../../services/usersService';
import { body, param, validationResult } from 'express-validator';
import { Request } from 'express-validator/src/base';
import {
  badRequest,
  unauthorized,
  userValidation,
} from '../../helpers/errorResponses';
import expressJwt from 'express-jwt';

const users = Router();

users.post(
  '/',
  [
    // email tiene que ser un email valido
    body('email').isEmail(),
    // password tiene que tener minimo 5 chars
    body('password').isLength({ min: 5 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw userValidation;
      }
      const response = await usersService.createUser(
        req.body.email,
        req.body.password
      );
      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);
users.post(
  '/login',
  [
    // email tiene que ser un email valido
    body('email').isEmail(),
    // password tiene que tener minimo 5 chars
    body('password').isLength({ min: 5 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw userValidation;
      }
      const response = await usersService.login(
        req.body.email,
        req.body.password
      );
      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);
users.get(
  '/id/:id',
  [param('id').isString()],
  expressJwt({ secret: jwtSecret, algorithms: ['HS256'] }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      // valida los parametros
      // y a la vez revisa que de todas formas esté definido el parametro id en el obj req
      if (!errors.isEmpty() || !req.params?.id) {
        throw badRequest;
      }
      const user = await usersService.getUserById(req.params.id);

      // si el sub del jwt no es igual al id del usuario que se pide retorna unauthorized
      if (user._id.toString() !== req.user.sub) {
        throw unauthorized;
      }
      res.send(user);
    } catch (err) {
      next(err);
    }
  }
);

export default users;
