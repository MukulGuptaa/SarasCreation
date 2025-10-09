const express = require('express');
const { cartController } = require('../../controllers');

const cartRouter = express.Router();

cartRouter.get('/ping', cartController.pingCartController);
cartRouter.post('/', cartController.createCart);
cartRouter.post('/items', cartController.upsertAddItem);
cartRouter.get('/:id', cartController.getCart);
cartRouter.post('/:id/items', cartController.addItem);
cartRouter.put('/:id/items', cartController.updateItem);
cartRouter.delete('/:id/items', cartController.removeItem);
cartRouter.delete('/:id', cartController.clearCart);

module.exports = cartRouter;

