import { Schema, model } from "mongoose";

const citySchema = new Schema(
  {
    country: String,
    name: String,
    lat: String,
    lng: String,
  },
  { collection: "cities", collation: { locale: "en", strength: 2 } }
);

export default model("City", citySchema);
