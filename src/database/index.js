const {MongoClient} = require('mongodb'); // creo un cliente para utilizar el servidor de mongo atlas
const debug = require('debug')('app:module-database');

const {Config} = require('../config/index');

var connection = null;
module.exports.Database = (collection) => new Promise(async(resolve, reject) => {
    try {
        if(!connection) {
            const client = new MongoClient(Config.mongoUri); //crea el cliente
            connection = await client.connect(); // generamos la conexion
            debug('Nueva conexion realizada con MongoDB Atlas');
        }
        debug('Reutilzando conexion');
        const db = connection.db(Config.mongoDbname); // si existe usa esa conexion con esa bd
        resolve(db.collection(collection));
    } catch(error) {
        reject(error);
    }
});