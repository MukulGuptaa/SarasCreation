const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, `Name cannot be empty!`]
    },
    description : {
        type: String,
        required: [true, `Description cannot be empty!`]
    },
    color : {
        type: String,
        required: [true, `color cannot be empty!`]
    },
    category : {
        type: String,
        required: [true, `Category cannot be empty!`]
    },
    subCategory : {
        type: String,
        required: [true, `SubCategory cannot be empty!`]
    },
    originalPrice : {
        type: Number,
        required: [true, `Price cannot be empty!`]
    },
    discountPrice : {
        type: String,
        required: [true, `Price cannot be empty!`]
    },
    imageUrl : {
        type: String,
        required: [true, `ImageUrl cannot be empty!`]
    },
    occassion : { //
        type: String,
        enum: ['wedding', 'dailyWear', 'gifting', 'festival'],
        required: [true, `Occasion cannot be empty!`]
    },
    quantity : {
        type: Number,
        required: [true, `Quantity cannot be empty!`]
    },
    threadType : {
        type: String,
        required: [true, `ThreadType cannot be empty!`]
    },
    fabricQuality : {
        type: String,
        required: [true, `FabricQuality cannot be empty!`]
    },
    fabricOrigin : {
        type: String,
        required: [true, `FabricOrigin cannot be empty!`]
    },
    designType : {
        type: String,
        required: [true, `FabricColor cannot be empty!`]
    },
    withBlouse : {
        type: Boolean,
        default: true
    },
    washCare : {
        type: String,
        default: 'Dry Clean'
    },
    weaverName : {
        type: String,
        required: [true, `WeaverName cannot be empty!`]
    },
    weaverPrice : {
        type: Number,
        required: [true, `WeaverPrice cannot be empty!`]
    },
    wholeSalePrice : {
        type: String,
        required: [true, `wholeSalePrice cannot be empty!`]
    },
    loom : {
        type: String,
        required: [true, `loom field cannot be empty!`]
    },
    tag: {
        type: String,
        default: "",
    },
});

const Product = mongoose.model('Product', productSchema); // model Object for doing crud operations in db

module.exports = Product;