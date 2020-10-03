import { ApiKey } from '../models';
import { v4 as uuidv4 } from 'uuid';

export default {
  createApiKey: async (userId: number) => {
    const key = uuidv4();
    return await ApiKey.create({ userId, key });
  },
  getApiKeysByUserId: async (userId: number) => {
    const apiKeys = await ApiKey.find({ userId }).exec((err, docs) => {
      // tslint:disable-next-line: max-line-length
      // https://stackoverflow.com/questions/12210870/how-to-get-array-of-json-objects-rather-than-mongoose-documents
      // retornar arreglo de objetos de mongoose
      // tslint:disable-next-line: no-parameter-reassignment
      docs = docs.map((o) => o.toObject());
    });
    return apiKeys;
  },
  deleteApiKeyById: async (apiKeyId: number) => {
    return await ApiKey.findByIdAndDelete(apiKeyId);
  },
};
