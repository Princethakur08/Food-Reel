const mongoose = require('mongoose');


function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(() =>{
        console.log("mongoDB connect");

        
    }).catch((err) => {
         console.log("MongoDB connection err", err);
    })
    
}

module.exports = connectDB;