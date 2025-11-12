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
                tag: productData.tag,
                wholeSaleSiteShowPrice: productData.wholeSaleSiteShowPrice,
            });
            return product;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAllProducts(page = 1, limit = 10, filters = {}) {
      try {
        const skip = (page - 1) * limit;
        
        // Build filter query
        let filterQuery = {};
        
        // 🟢 Handle hierarchical category-subcategory structure
        if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
          const categoryConditions = filters.categories.map(categoryFilter => {
            const condition = { category: categoryFilter.name.trim() };
            
            // If subcategories are specified AND not empty, add them to the condition
            if (categoryFilter.subCategories && Array.isArray(categoryFilter.subCategories) && categoryFilter.subCategories.length > 0) {
              condition.subCategory = { 
                $in: categoryFilter.subCategories.map(sc => sc.trim()) 
              };
            }
            // If subCategories is empty array, it means get ALL subcategories for that category
            
            return condition;
          });
          
          // Use $or to combine all category conditions
          if (categoryConditions.length === 1) {
            Object.assign(filterQuery, categoryConditions[0]);
          } else {
            filterQuery.$or = categoryConditions;
          }
        }
  
        // 🟢 Handle loom filter (applies as AND to the above results)
        if (filters.loom && Array.isArray(filters.loom) && filters.loom.length > 0) {
          filterQuery.loom = { $in: filters.loom.map(l => l.trim()) };
        }
  
        // 🟢 Handle occasion filter (applies as AND to the above results)
        if (filters.occassion && Array.isArray(filters.occassion) && filters.occassion.length > 0) {
          filterQuery.occassion = { $in: filters.occassion.map(o => o.trim()) };
        }
    
        console.log('Final MongoDB Query:', JSON.stringify(filterQuery, null, 2));
    
        // Fetch products with pagination and filters
        const products = await Product.find(filterQuery)
          .sort({ wholeSaleSiteShowPrice: 1 })
          .skip(skip)
          .limit(limit);
    
        // Get total count for pagination metadata
        const totalProducts = await Product.countDocuments(filterQuery);
    
        return {
          products,
          totalProducts,
          page,
          limit,
          totalPages: Math.ceil(totalProducts / limit),
          filters: filters
        };
    
      } catch (error) {
        console.error('Error in getAllProducts:', error);
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

    async getTaggedProducts() {
        try {
          const products = await Product.find({
            tag: { $exists: true, $ne: "" }
          }).select("name description imageUrl tag"); // select only needed fields
      
          // Transform response
          return products.map((product) => ({
            id: product._id,
            title: product.name,
            description: product.description,
            image: product.imageUrl,
            badge: product.tag
          }));
        } catch (error) {
          console.error("Error in ProductRepository.getTaggedProducts:", error);
          throw error;
        }
      }
      
      


}

module.exports = ProductRepository;