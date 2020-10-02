import { User } from '../models';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  userInvalidCredentials,
  userNotFound,
  userAlreadyExists,
} from '../helpers/errorResponses';

const jwtSecret = process.env.JWT_SECRET || 'default';

export default {
  createUser: async (email: string, password: string) => {
    const userExists = await User.exists({ email });
    if (!userExists) {
      const hashedPassword = await hash(password, 10);
      return await User.create({ email, password: hashedPassword });
    }
    throw userAlreadyExists;
  },
  changePassword: async (id: number, password: string) => {
    try {
      const hashedPassword = await hash(password, 10);
      const user = await User.findById(id);
      if (!user) {
        return userNotFound;
      }
      user.set({ password: hashedPassword });
      return await user.save();
    } catch (err) {
      throw new Error(`Error in usersService, changePassword: ${err}`);
    }
  },
  login: async (email: string, password: string) => {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw userNotFound;
    }
    const userObj = user.toObject();
    const isPasswordValid = await compare(password, userObj.password);
    if (!isPasswordValid) {
      throw userInvalidCredentials;
    }
    // firma un token json con expiracion en 30 dias
    const jwt = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        id: userObj._id,
      },
      jwtSecret
    );
    return { token: jwt };
  },
};
