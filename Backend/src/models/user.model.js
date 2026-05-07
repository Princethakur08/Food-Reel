const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{

        type:String,
       
    }
},
 {
    timestamp: true 
})

const userModel = mongoose.model("user", Userschema );

module.exports = userModel;