# Backend Challenge de Clima

## Podes probar registrarte y generar tus propias llaves en esta interfaz:

[Frontend de Sistema de usuarios del challenge](https://vagus-art.github.io/Challenge-Node-Weather-Users/#/)

- Si querés ver el código fuente, está en [este repo](https://github.com/Vagus-art/Challenge-Node-Weather-Users)

## De todas formas podés usar la API REST con Postman usando este enlace:

<https://node-weather-challenge.herokuapp.com/>

## Qué hace

Devuelve el clima de la ciudad que elijas, con datos climáticos al azar, pero con coordenadas correctas, para ser utilizadas en un mapa.

Obtiene los datos de las ciudades desde un dataset que cree en un shard de MongoDB atlas importando [cities.json](https://github.com/lutangar/cities.json)

Tiene dos tipos de autorización, una por **jsonwebtokens**, que la uso para proteger todos los endpoints del sistema de usuarios, y
**apikeys**, que son keys generadas usando la librería **uuid**, y almacenadas en otra colección de mongo, esas keys son usadas para proteger
el endpoint principal, y los usuarios pueden generarlas, obtenerlas y revocarlas **(solamente las que les pertenecen)**

## Librerías utilizadas

### Principales

- express

Librería para crear un servidor con rutas y middlewares.

- express-validator

Middleware para validar datos entrantes.

- express-jwt

Middleware para validar jsonwebtokens.

- cors

Middleware que usé para agregar el header `Access-Control-Allow-Origin : *`.

- dotenv

Librería que carga variables de entorno en el proceso de node (MONGO_URI y JWT_SECRET), son necesarias para el correcto funcionamiento de esta app, para setearlas crear un `.env` siguiendo los contenidos del `.env.example` cómo ejemplo.

- mongoose

Interfaz de Mongodb para Nodejs.

- bcrypt

Librería que uso para encriptar las contraseñas antes de almacenarlas, y para compararlas en el login.

- uuid

Librería que uso para generar llaves unicas que sirven de `api keys`.

### De desarrollo

- typescript (con @types para todas las librerías que usé)

Compilador de typescript, que aparte de compilar typescript me permite usar imports/exports de es6 en vez de require().

- ts-node

Interpreta typescript sin tener que compilar.

- nodemon

Observa cambios en los archivos y de haberlos reinicia el servidor, para desarrollar de forma fluída.

- prettier

Formatea el código de forma automática.

- tslint

Me da advertencias para seguir buenas prácticas al programar.

- husky

Me sirve para hacer hooks que se ejecutan antes de hacer commits, lo usé para ejecutar prettier antes de hacer commit a git.

## Cómo funciona el backend

`index.ts` es la raíz de la app, desde ahí conecto la base de datos importada desde `connectDB.ts`, y ejecuto el servidor de express importado desde `app.ts`.

El servidor de express importa todas sus rutas desde `/routes`, en donde tengo un router que se encarga de importar las rutas de cada entidad por separado (apiKeys, users y weather).

Las rutas utilizan funciones importadas desde la carpeta `/services`, ahí es donde escribo todas las interacciones con la base de datos usando los modelos de mongoose de la carpeta `models`.

En `/helpers` es donde guardo los errores que tiro usando `throw` desde cualquier parte del flujo de la aplicación, que son atrapados con un `catch` al final de la cadena de middlewares de express, y enviados como json.

`/helpers/weatherDescriptionsList.ts` tiene un par de descripciones climáticas para ser importadas al azar en `/helpers/weatherHelpers.ts`, dan un texto descriptivo y un código de ícono de openweather.

`/helpers/weatherHelpers.ts` es en donde genero los datos climáticos y les doy la estructura de la api de openweather.

`/middleware/checkApiKey` es un middleware propio que verifica que la apikey que mandaste esté en la base de datos para determinar si estas autorizado para usar la api

## Rutas

### Weather

Tiene un solo endpoint, devuelve los datos climáticos de la ciudad que elijas.

#### Obtener Clima. [Get /weather?q={Ciudad}&appid={API Key}]

- appid es un api key, no un jwt.

### Users

Rutas CRUD para la entidad de usuarios, con login agregado.

#### Iniciar Sesión. [POST /users/login]

- Devuelve un token que es necesario para usar el resto de los endpoints de usuarios y apikeys.

* Request (application/json)

  - Body

          {
              "email": "email",
              "password": "string",
          }

#### Crear Usuario. [POST /users]

- Crea un usuario.

* Request (application/json)

  - Body

          {
              "email": "email",
              "password": "string",
          }

#### Cambiar Contraseña. [PUT /users]

- Cambiar contraseña, la identidad del usuario a modificar es obtenida desde el token.

* Request (application/json)

  - Headers

            Authorization: Bearer {token}

  - Body

          {
              "password": "string",
          }

#### Obtener Datos de Usuario. [GET /users/id/{id}]

- Obtener los datos de un usuario en específico, la id del parámetro y la del token deben coincidir.

* Request (application/json)

  - Headers

            Authorization: Bearer {token}

### Api Keys

Rutas que se encargan de la manipulación de las keys de los usuarios.

#### Generar Una Key. [POST /apikeys]

- Genera una key vinculada al usuario del token, y la retorna.

* Request (application/json)

  - Headers

            Authorization: Bearer {token}

#### Obtener Keys. [Get /apikeys]

- Retorna todas las keys del usuario dentro del token.

* Request (application/json)

  - Headers

            Authorization: Bearer {token}

#### Revocar Key. [Get /apikeys]

- Elimina la key pasada por parámetros, solamente el usuario que es dueño de la key está autorizado a hacerlo.

* Request (application/json)

  - Headers

            Authorization: Bearer {token}
