const express = require('express');
const debug = require('debug')('app:main');
const {Config} = require('./src/config/index');
const {ProductsAPI} = require('./src/products/index');
const {UsersAPI} = require('./src/users/index');
const {SalesAPI} = require('./src/sales/index');
const {IndexAPI, NotFoundAPI} = require('./src/index/index');
const cors = require('cors');

const app = express();

app.use(cors());

/// configuro las url que pueden usar mis datos
let whileList = ['http://localhost:3000/', 'http://localhost:3000/Productos'];

let corsOptions = {
    origin: (origin, callback) => {
        if(whileList.indexOf(origin) != -1) { // si el origen esta
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(express.json()); // con esto le damos la capacidad de que el cliente nos envie un body en el req

/// Modulos
IndexAPI(app); // tiene que ir primero para que reciba todos los req primero
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app); // si paso por todas las rutas va a responder con un error


app.get('/', cors(corsOptions), (req, res) => {
    res = ProductsAPI.get();
})

app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
});
