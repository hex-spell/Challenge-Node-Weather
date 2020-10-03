import { ApiKey } from '../models';
import { v4 as uuidv4 } from 'uuid';
import { ApiKeyType } from '../models/ApiKey';
import { userInvalidCredentials } from '../helpers/errorResponses';

export default {
  createApiKey: async (userId: string) => {
    const key = uuidv4();
    return await ApiKey.create({ userId, key });
  },
  getApiKeysByUserId: async (userId: string) => {
    const apiKeys = await ApiKey.find({ userId }).exec();
    return apiKeys;
  },
  getApiKeyById: async (apiKeyId: string) => {
    const apiKey = await ApiKey.findById(apiKeyId).exec();
    if (!apiKey) {
      throw userInvalidCredentials;
    }
    const apiKeyObj: ApiKeyType = apiKey.toObject();
    return apiKeyObj;
  },
  deleteApiKeyById: async (apiKeyId: string) => {
    return await ApiKey.findByIdAndDelete(apiKeyId);
  },
  exists: async (apiKey: string) => {
    return await ApiKey.exists({ key: apiKey });
  },
};
