const express = require('express');
const debug = require('debug')('app:main');
const {Config} = require('./src/config/index');
const {ProductsAPI} = require('./src/products/index');
const {UsersAPI} = require('./src/users/index');
const {SalesAPI} = require('./src/sales/index');
const {IndexAPI, NotFoundAPI} = require('./src/index/index');

const app = express();

const cors=require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json()); // con esto le damos la capacidad de que el cliente nos envie un body en el req

/// Modulos
IndexAPI(app); // tiene que ir primero para que reciba todos los req primero
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app); // si paso por todas las rutas va a responder con un error


app.listen(Config.port, () => {
    debug(`Servidor escuchando en el puerto ${Config.port}`)
});
