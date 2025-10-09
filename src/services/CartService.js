class CartService{
    constructor(cartRepository){
        this.cartRepository = cartRepository;
    }

    async createCart(){
        return await this.cartRepository.createCart();
    }

    async getCart(cartId){
        return await this.cartRepository.getCartById(cartId);
    }

    async addItem(cartId, productId, quantity){
        return await this.cartRepository.addItem(cartId, productId, quantity);
    }

    async upsertAddItem(cartId, productId, quantity){
        return await this.cartRepository.upsertAddItem(cartId, productId, quantity);
    }

    async updateItem(cartId, productId, quantity){
        return await this.cartRepository.updateItem(cartId, productId, quantity);
    }

    async removeItem(cartId, productId){
        return await this.cartRepository.removeItem(cartId, productId);
    }

    async clearCart(cartId){
        return await this.cartRepository.clearCart(cartId);
    }
}

module.exports = CartService;

