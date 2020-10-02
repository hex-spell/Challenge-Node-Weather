import dotenv from "dotenv";
import path from "path";

// agrego variables de entorno de la carpeta root
dotenv.config({ path: path.join(__dirname, "/../.env") });

import app from "./app";
import connectDB from "./connectDB";

// conectar a mongodb
connectDB();

const port = process.env.PORT || 3000;

// ejecutar server de express
app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Servidor iniciado en el port ${port}!`);
});
