const { StatusCodes } = require('http-status-codes');
const { ProductsRepository } = require('../repositories');
const CartRepository = require('../repositories/CartRepository');
const CartService = require('../services/CartService');

const cartService = new CartService(new CartRepository());

function pingCartController(req, res){
    return res.json({message: "Cart controller is up"});
}

async function createCart(req, res, next){
    try{
        const cart = await cartService.createCart();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created a new cart',
            error: {},
            data: cart
        });
    } catch(error) {
        next(error);
    }
}

async function getCart(req, res, next){
    try{
        const cart = await cartService.getCart(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched cart',
            error: {},
            data: cart
        });
    } catch(error) {
        next(error);
    }
}

async function addItem(req, res, next){
    try{
        const { productId, quantity } = req.body;
        const cart = await cartService.addItem(req.params.id, productId, Number(quantity || 1));
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Item added to cart',
            error: {},
            data: cart
        });
    } catch(error) {
        next(error);
    }
}

async function upsertAddItem(req, res, next){
    try{
        const { cartId, productId, quantity } = req.body;
        const cart = await cartService.upsertAddItem(cartId, productId, Number(quantity || 1));
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Item added to cart (upsert)',
            error: {},
            data: cart
        });
    } catch(error) {
        next(error);
    }
}

async function updateItem(req, res, next){
    try{
        const { productId, quantity } = req.body;
        const cart = await cartService.updateItem(req.params.id, productId, Number(quantity));
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Cart item updated',
            error: {},
            data: cart
        });
    } catch(error) {
        next(error);
    }
}

async function removeItem(req, res, next){
    try{
        const { productId } = req.body;
        const cart = await cartService.removeItem(req.params.id, productId);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Cart item removed',
            error: {},
            data: cart
        });
    } catch(error) {
        next(error);
    }
}

async function clearCart(req, res, next){
    try{
        const cart = await cartService.clearCart(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Cart cleared',
            error: {},
            data: cart
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    pingCartController,
    createCart,
    getCart,
    addItem,
    upsertAddItem,
    updateItem,
    removeItem,
    clearCart
}

