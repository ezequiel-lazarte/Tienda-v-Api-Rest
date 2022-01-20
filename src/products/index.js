const express = require('express');
const {ProductsController} = require('./controller');
const router = express.Router();
const cors = require('cors');

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

app.get('/', cors(corsOptions), (req, res) => {
    res = ProductsController.getProducts;
})

module.exports.ProductsAPI = (app) => {
    router
    .get('/', ProductsController.getProducts) /// http://Localhost:3000/api/products
    .get('/report', ProductsController.generateReport)
    .get('/:id', ProductsController.getProduct) /// http://Localhost:3000/api/products/3
    .post('/', ProductsController.createProduct)
    .put('/:id', ProductsController.updateProduct)
    .delete('/:id', ProductsController.deleteProduct);
    app.use('/api/products', router); // la app va a dejar disponible todos esos metodos en la url
}