

class ProductService{
    
    constructor(productRespository){
        this.productRespository = productRespository;
    }

    async createProduct(productData){

        const product = await this.productRespository.createProduct(productData);
        return product;
            
    }

    async getAllProducts(page = 1, limit = 10) {
        const data = await this.productRespository.getAllProducts(page, limit);
        return data;
    }

    async getProduct(id){
        const product = await this.productRespository.getProduct(id);
        return product; 
    }

    async deleteProduct(id){
        const product = await this.productRespository.deleteProduct(id);
        return product;
    }

    async updateProduct(id, productData){
        const product = await this.productRespository.updateProduct(id, productData);
        return product;
    }


}

module.exports = ProductService;