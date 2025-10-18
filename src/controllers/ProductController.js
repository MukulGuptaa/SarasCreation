const { StatusCodes } = require('http-status-codes');
const NotImplementedError = require('../errors/notImplemented.error');
const {ProductsService} = require('../services');
const {ProductsRepository} = require('../repositories');

const productsService = new ProductsService(new ProductsRepository());

function pingProductsController(req, res){
    return res.json({message: "Products controller is up"});
}

async function addProducts(req, res, next){
    try{
        const newProduct = await productsService.createProduct(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created a new product',
            error: {},
            data: newProduct
        });
    } catch(error) {
        next(error);
    }
}

async function getProduct(req, res, next){
    try{
        const product = await productsService.getProduct(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched a product',
            error: {},
            data: product
        });
    } catch(error) {
        next(error);
    }
}

async function getProducts(req, res, next){
    try{

        const { page = 1, limit = 10 } = req.query;

        const productsData = await productsService.getAllProducts(parseInt(page),parseInt(limit));
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched all products',
            error: {},
            data: productsData
        });
    } catch(error) {
        next(error);
    }
}

async function updateProducts(req, res, next){
    try{
        const product = await productsService.updateProduct(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully updated a product',
            error: {},
            data: product
        });
    } catch(error) {
        next(error);
    }
}

async function deleteProducts(req, res, next){
    try{
        const product = await productsService.deleteProduct(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully deleted a product',
            error: {},
            data: req.params.id// check this
        });
    } catch(error) {
        next(error);
    }
}

async function deleteAllProducts(req, res, next) {
    try {
      const result = await productsService.deleteAllProducts();
  
      return res.status(StatusCodes.OK).json({
        success: true,
        message: `Successfully deleted ${result.deletedCount} products.`,
        error: {},
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

module.exports = {
    addProducts,
    getProduct,
    getProducts,
    updateProducts,
    deleteProducts,
    pingProductsController,
    deleteAllProducts
}