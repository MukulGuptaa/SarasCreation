const express = require('express');
const { PORT } = require('./config/server.config');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');
const mongoose = require('mongoose');
// const connectToDB = require('./config/db.config');
const { ATLAS_DB_URL, NODE_ENV } = require('./config/server.config');

const app = express();

// CORS configuration
app.use(cors({
    origin: [
      'https://saree-ecommerce-zeta.vercel.app', // ✅ your frontend domain
    ], // Allow all origins - you can restrict this to your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());



let isConnected = false;

async function connectToDB(){
    try{
        await mongoose.connect(ATLAS_DB_URL);
        isConnected = true;
        console.log('Connected to mongoDb');
    }catch(error){
        console.log('Error connecting to mongoDb: ',error);
    }
}

app.use((req, res, next) => {
  if(!isConnected){
    connectToDB();
  }
  next();
});

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
    return res.json({message: "Product servive is alive"});
});

app.use(errorHandler);



// app.listen(PORT, async () => {
//     console.log(`Server started at PORT: ${PORT}`);
//     // await connectToDB();
// });

module.exports = app;
