require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT, /// accedo a las variables de entorno del .env
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME
};