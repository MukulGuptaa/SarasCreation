const express = require('express');
const productRouter = require('./ProductRoutes');
const cartRouter = require('./CartRoutes');

const v1Router = express.Router();

v1Router.use('/products', productRouter);
v1Router.use('/cart', cartRouter);

module.exports = v1Router;