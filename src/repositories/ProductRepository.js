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
    // Category, subcategory, Weavername, WeaverPrice, fabricQuality, designType, 

    async getAllProducts(){
        try{
            const products = await Product.find({});
            return products;
        } catch(error) {
            console.log(error);
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