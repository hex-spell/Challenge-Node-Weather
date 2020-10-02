import dotenv from 'dotenv';
import path from 'path';

// agrego variables de entorno de la carpeta root
dotenv.config({ path: path.join(__dirname, '/../.env') });

import app from './app';
import connectDB from './connectDB';

// conectar a mongodb
connectDB()
  .then(() => {
    const port = process.env.PORT || 4000;

    // ejecutar server de express
    app.listen(port, () => {
      // tslint:disable-next-line: no-console
      console.log(`Servidor iniciado en el port ${port}!`);
    });
  })
  // tslint:disable-next-line: no-console
  .catch((err: Error) => console.log(err));
