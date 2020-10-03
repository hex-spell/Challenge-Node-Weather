import { Schema, model } from 'mongoose';

const citySchema = new Schema(
  {
    country: String,
    name: String,
    lat: String,
    lng: String,
  },
  {
    collection: 'cities',
    collation: { locale: 'en', strength: 2 },
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
  }
);

export default model('City', citySchema);

// tipo para typescript
export type CityType = {
  country: string;
  name: string;
  lat: string;
  lng: string;
};
