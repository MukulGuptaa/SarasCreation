const { Cart } = require('../models');
const NotFoundError = require('../errors/notFound.error');

class CartRepository{
    async createCart(){
        const cart = await Cart.create({ items: [] });
        return cart;
    }

    async getCartById(id){
        const cart = await Cart.findById(id).populate('items.product');
        if(!cart){
            throw new NotFoundError('Cart', id);
        }
        return cart;
    }

    async addItem(cartId, productId, quantity){
        const cart = await Cart.findById(cartId);
        if(!cart){
            throw new NotFoundError('Cart', cartId);
        }
        const existingItem = cart.items.find(i => i.product.toString() === productId);
        if(existingItem){
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        return cart;
    }

    async upsertAddItem(cartId, productId, quantity){
        let cart;
        if(cartId){
            cart = await Cart.findById(cartId);
        }
        if(!cart){
            cart = await Cart.create({ items: [] });
        }

        const existingItem = cart.items.find(i => i.product.toString() === productId);
        if(existingItem){
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        return cart;
    }

    async updateItem(cartId, productId, quantity){
        const cart = await Cart.findById(cartId);
        if(!cart){
            throw new NotFoundError('Cart', cartId);
        }
        const item = cart.items.find(i => i.product.toString() === productId);
        if(!item){
            throw new NotFoundError('Cart Item', `${cartId}:${productId}`);
        }
        item.quantity = quantity;
        await cart.save();
        return cart;
    }

    async removeItem(cartId, productId){
        const cart = await Cart.findById(cartId);
        if(!cart){
            throw new NotFoundError('Cart', cartId);
        }
        cart.items = cart.items.filter(i => i.product.toString() !== productId);
        await cart.save();
        return cart;
    }

    async clearCart(cartId){
        const cart = await Cart.findById(cartId);
        if(!cart){
            throw new NotFoundError('Cart', cartId);
        }
        cart.items = [];
        await cart.save();
        return cart;
    }
}

module.exports = CartRepository;

