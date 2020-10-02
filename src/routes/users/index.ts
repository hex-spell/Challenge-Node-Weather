import { Response, Router } from 'express';
import usersService from '../../services/usersService';
import { body, validationResult } from 'express-validator';
import { Request } from 'express-validator/src/base';
import { userValidation } from '../../helpers/errorResponses';

const users = Router();

users.post(
  '/',
  [
    // email tiene que ser un email valido
    body('email').isEmail(),
    // password tiene que tener minimo 5 chars
    body('password').isLength({ min: 5 }),
  ],
  async (req: Request, res: Response) => {
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
      if (err.cod) {
        res.status(err.cod).send(err);
      }
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
  async (req: Request, res: Response) => {
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
      if (err.cod) {
        res.status(err.cod).send(err);
      }
    }
  }
);

export default users;
