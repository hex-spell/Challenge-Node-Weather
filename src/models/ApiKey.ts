import { Schema, model } from 'mongoose';

const apiKeySchema = new Schema<ApiKeyType>(
  {
    userId: {
      required: true,
      type: String,
    },
    key: {
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    collection: 'apikeys',
    versionKey: false,
  }
);

export default model('ApiKey', apiKeySchema);

// tipo para typescript
export type ApiKeyType = {
  userId: string;
  key: string;
};
