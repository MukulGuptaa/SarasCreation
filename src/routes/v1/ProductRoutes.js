const express = require('express');
const { productsController } = require('../../controllers');

const productsRouter = express.Router();

productsRouter.get('/ping', productsController.pingProductsController);
productsRouter.get('/:id', productsController.getProduct);
productsRouter.get('/', productsController.getProducts);
productsRouter.post('/', productsController.addProducts);
productsRouter.delete('/:id', productsController.deleteProducts);
productsRouter.put('/:id', productsController.updateProducts);

module.exports = productsRouter;