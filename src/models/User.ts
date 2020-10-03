import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    collection: 'users',
  }
);

export default model('User', userSchema);

// tipo para typescript
export type User = {
  email: string;
  password: string;
};
