// const mongoose = require('mongoose');
// const { ATLAS_DB_URL, NODE_ENV } = require('./server.config');

// async function connectToDB(){
//     try{
//         if(NODE_ENV === "development"){
//             console.log("Attempting to connect to MongoDB Atlas...");
//             await mongoose.connect(ATLAS_DB_URL);
//             console.log("Successfully connected to DB");
//         }
//     } catch(error){
//         console.log("Unable to connect to db server");
//         console.log(error);
//     }
// }

// let isConnected = false;

// async function connectToDB(){
//     try{
//         await mongoose.connect(ATLAS_DB_URL);
//         isConnected = true;
//         console.log('Connected to mongoDb');
//     }catch(error){
//         console.log('Error connecting to mongoDb: ',error);
//     }
// }

// module.exports = connectToDB;