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
                loom: productData.loom,
            });
            return product;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProducts(page = 1, limit = 10, filters = {}) {
        try {
          // Calculate skip count
          const skip = (page - 1) * limit;
          
          // Build filter object based on provided filters
          const filterQuery = {};
          
          // 🟢 Handle multiple categories
            if (filters.category) {
                const categories = Array.isArray(filters.category)
                ? filters.category
                : filters.category.split(',');
                filterQuery.category = { $in: categories.map(c => c.trim()) };
            }

            // 🟢 Handle multiple subcategories
            if (filters.subCategory) {
                const subCategories = Array.isArray(filters.subCategory)
                ? filters.subCategory
                : filters.subCategory.split(',');
                filterQuery.subCategory = { $in: subCategories.map(s => s.trim()) };
            }

            // 🟢 Handle multiple looms
            if (filters.loom) {
                const looms = Array.isArray(filters.loom)
                ? filters.loom
                : filters.loom.split(',');
                filterQuery.loom = { $in: looms.map(l => l.trim()) };
            }

            // 🟢 Handle multiple occasions
            if (filters.occassion) {
                const occassions = Array.isArray(filters.occassion)
                ? filters.occassion
                : filters.occassion.split(',');
                filterQuery.occassion = { $in: occassions.map(o => o.trim()) };
            }
      
          // Fetch products with pagination and filters
          const products = await Product.find(filterQuery).skip(skip).limit(limit);
      
          // Get total count for pagination metadata (with filters applied)
          const totalProducts = await Product.countDocuments(filterQuery);
      
          // Send paginated response
          return {
            products,
            totalProducts,
            page,
            limit,
            totalPages: Math.ceil(totalProducts / limit),
            filters: filters // Include applied filters in response
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

    async deleteAllProducts() {
        try {
          const result = await Product.deleteMany({});
          return result; // contains { acknowledged: true, deletedCount: <number> }
        } catch (error) {
          console.error('Error in productRepository.deleteAllProducts:', error);
          throw error;
        }
    }


    async getFiltersHierarchy() {
        try {
          const result = await Product.aggregate([
            {
              $facet: {
                categorySubcategory: [
                  {
                    $group: {
                      _id: { category: "$category", subCategory: "$subCategory" },
                      count: { $sum: 1 }
                    }
                  },
                  {
                    $group: {
                      _id: "$_id.category",
                      subcategories: {
                        $push: { name: "$_id.subCategory", count: "$count" }
                      },
                      totalCount: { $sum: "$count" }
                    }
                  },
                  {
                    $project: {
                      _id: 0,
                      category: "$_id",
                      totalCount: 1,
                      subcategories: {
                        $sortArray: { input: "$subcategories", sortBy: { count: -1 } }
                      }
                    }
                  },
                  { $sort: { totalCount: -1 } } // popular categories first
                ],
    
                looms: [
                  {
                    $group: { _id: "$loom", count: { $sum: 1 } }
                  },
                  {
                    $project: { _id: 0, name: "$_id", count: 1 }
                  },
                  { $sort: { count: -1 } } // popular looms first
                ],
    
                occasions: [
                  {
                    $group: { _id: "$occassion", count: { $sum: 1 } }
                  },
                  {
                    $project: { _id: 0, name: "$_id", count: 1 }
                  },
                  { $sort: { count: -1 } } // popular occasions first
                ]
              }
            }
          ]);
    
          return result[0];
        } catch (error) {
          console.error("Error in ProductRepository.getFiltersHierarchy:", error);
          throw error;
        }
    }
      


}

module.exports = ProductRepository;