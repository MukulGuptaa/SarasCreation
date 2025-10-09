const express = require('express');
const { PORT } = require('./config/server.config');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');
const connectToDB = require('./config/db.config');

const app = express();

// CORS configuration
app.use(cors({
    origin: '*', // Allow all origins - you can restrict this to your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false // Set to true if you need to send cookies
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.json({message: "Product servive is alive"});
});

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`);
    await connectToDB();
});









/*



const mongoose = require('mongoose');
const {Product} = require('./models'); // your model
const productData = require('./products.json'); // your JSON file

// Default values for other fields
const DEFAULTS = {
  description: "Default description",
  color: "Default color",
  originalPrice: 1000,
  discountPrice: 900,
  occassion: "dailyWear",
  quantity: 1,
  threadType: "Default thread",
  fabricQuality: "Default quality",
  fabricOrigin: "Default origin",
  designType: "Default design",
  withBlouse: true,
  washCare: "Dry Clean",
  weaverPrice: 500,
  wholeSalePrice: 800
};

async function seedProducts() {
  try {

    for (const key of Object.keys(productData)) {
      const images = productData[key]; // array of image URLs
      const [category, subCategory, weaverName] = key.split('_');

      for (const imageObj of images) {
        const imageUrl = imageObj.url;
        await Product.create({
          name: key, // category_subCategory_weaverName
          category,
          subCategory,
          weaverName,
          imageUrl,
          ...DEFAULTS
        });

        console.log(`Created product: ${key}`);
      }
    }

    console.log('All products seeded successfully!');
  } catch (err) {
    console.error('Error seeding products:', err);
  }
}

seedProducts();
*/