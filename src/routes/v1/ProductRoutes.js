const express = require('express');
const { productsController } = require('../../controllers');

const productsRouter = express.Router();

productsRouter.get('/ping', productsController.pingProductsController);
productsRouter.get('/filters', productsController.getFilterHierarchy);
productsRouter.get('/:id', productsController.getProduct);
productsRouter.get('/', productsController.getProducts);
productsRouter.post('/', productsController.addProducts);
productsRouter.delete('/:id', productsController.deleteProducts);
productsRouter.delete('/', productsController.deleteAllProducts);
productsRouter.put('/:id', productsController.updateProducts);

module.exports = productsRouter;