

class ProductService{
    
    constructor(productRespository){
        this.productRespository = productRespository;
    }

    async createProduct(productData){

        const product = await this.productRespository.createProduct(productData);
        return product;
            
    }

    async getAllProducts(page = 1, limit = 10, filters = {}) {
        const data = await this.productRespository.getAllProducts(page, limit, filters);
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

    async deleteAllProducts() {
        try {
          const result = await this.productRespository.deleteAllProducts();
          return result;
        } catch (error) {
          console.error('Error in productService.deleteAllProducts:', error);
          throw error;
        }
    }

    async getFiltersHierarchy() {
        return await this.productRespository.getFiltersHierarchy();
    }
      
    async getTaggedProducts() {
        return await this.productRespository.getTaggedProducts();
    }
      


}

module.exports = ProductService;