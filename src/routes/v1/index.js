const express = require('express');
const productRouter = require('./ProductRoutes');
const cartRouter = require('./CartRoutes');
const calendarRouter = require('./CalendarRoutes');

const v1Router = express.Router();

v1Router.use('/products', productRouter);
v1Router.use('/cart', cartRouter);
v1Router.use('/', calendarRouter);

module.exports = v1Router;