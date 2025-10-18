const logger = require("../config/logger.config");
const NotFoundError = require("../errors/notFound.error");
const NotImplementedError = require("../errors/notImplemented.error");
const { Product } = require("../models");

class ProductRepository{
    async createProduct(productData){
        try{
            const product = await Product.create({
                name: productData.name,
                description: productData.description,
                color: productData.color,
                category: productData.category,
                subCategory: productData.subCategory,
                originalPrice: productData.originalPrice,
                discountPrice: productData.discountPrice,
                imageUrl: productData.imageUrl,
                occassion: productData.occassion,
                quantity: productData.quantity,
                threadType: productData.threadType,
                fabricQuality: productData.fabricQuality,
                fabricOrigin: productData.fabricOrigin,
                designType: productData.designType,
                withBlouse: productData.withBlouse,
                washCare: productData.washCare,
                weaverName: productData.weaverName,
                weaverPrice: productData.weaverPrice,
                wholeSalePrice: productData.wholeSalePrice,
            });
            return product;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProducts(page = 1, limit = 10) {
        try {
          // Calculate skip count
          const skip = (page - 1) * limit;
      
          // Fetch products with pagination
          const products = await Product.find({}).skip(skip).limit(limit);
      
          // Get total count for pagination metadata
          const totalProducts = await Product.countDocuments();
      
          // Send paginated response
          return {
            products,
            totalProducts,
            page,
            limit,
            totalPages: Math.ceil(totalProducts / limit),
          };
      
        } catch (error) {
          console.error(error);
          throw error;
        }
    }
      

    async getProduct(id){
        try {
            const product = await Product.findById(id);
            if(!product){
                throw new NotFoundError("Product", id);
            }
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteProduct(id){
        try {
            const product = await Product.findByIdAndDelete(id);
            if(!product){
                logger.error(`Product with id: ${id} not found in db`);
                throw new NotFoundError("Product", id);
            }
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateProduct(id, productData){
        try {
            const product = await Product.findByIdAndUpdate(id, productData, {new: true}); // check this
            if(!product){
                throw new NotFoundError("Product", id);
            }
            return product;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

module.exports = ProductRepository;