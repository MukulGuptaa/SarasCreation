const express = require('express');
const productRouter = require('./ProductRoutes');

const v1Router = express.Router();

v1Router.use('/products', productRouter);

module.exports = v1Router;