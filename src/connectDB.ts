import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string =
      process.env.MONGO_URI || "mongodb://localhost:27017/";
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(mongoURI, options);
    // tslint:disable-next-line: no-console
    console.log("Base de datos conectada...");
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.error(err.message);
    // Crashear app si la base de datos no se conecta
    process.exit(1);
  }
};

export default connectDB;
