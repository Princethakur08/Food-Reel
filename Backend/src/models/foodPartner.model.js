const mongoose = require('mongoose');

const foodPrtnerSchema = new mongoose.Schema ({

    businessName:{
        type: String,
        required: true
    },

    address:{
        type:String,
        required:true
    },


    email: {
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required: true
    }

})

const foodPartnerModel = mongoose.model("FoodPartner", foodPrtnerSchema)

module.exports = foodPartnerModel;