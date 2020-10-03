import { User } from '../models';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  userInvalidCredentials,
  userNotFound,
  userAlreadyExists,
} from '../helpers/errorResponses';
import { UserType } from '../models/User';

export const jwtSecret = process.env.JWT_SECRET || 'default';

export default {
  createUser: async (email: string, password: string) => {
    const userExists = await User.exists({ email });
    if (userExists) {
      throw userAlreadyExists;
    }
    const hashedPassword = await hash(password, 10);
    const createdUser = await User.create({ email, password: hashedPassword });
    const createdUserObj = createdUser.toObject();
    // prevengo que el campo de password sea retornado
    delete createdUserObj.password;
    return createdUserObj;
  },
  changePassword: async (id: number, password: string) => {
    const user = await User.findById(id);
    if (!user) {
      throw userNotFound;
    }
    const hashedPassword = await hash(password, 10);
    user.set({ password: hashedPassword });
    const saveResponse = await user.save();
    return !!saveResponse;
  },
  login: async (email: string, password: string) => {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw userNotFound;
    }
    const userObj: UserType = user.toObject();
    const isPasswordValid = await compare(password, userObj.password);
    if (!isPasswordValid) {
      throw userInvalidCredentials;
    }
    // firma un token json de acceso con expiracion en 1 hora
    const jwt = sign({}, jwtSecret, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      algorithm: 'HS256',
      // por alguna razón mongoose retorna el id como un tipo que no es string
      subject: userObj._id.toString(),
    });
    return { token: jwt };
  },
  getUserById: async (userId: number) => {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw userNotFound;
    }
    const userObj = user.toObject();
    // prevengo que el campo de password sea retornado
    delete userObj.password;
    return userObj;
  },
};
