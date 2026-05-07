const foodPartnerModel = require("../src/models/foodPartner.model")
const jwt = require("jsonwebtoken");
const userModel = require("../src/models/user.model")

async function authFoodpartnerMiddleware(req, res, next) {


    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "please login first"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner
        next()

    } catch (err) {

        return res.status(401).json({
            message: "invalid token"
        })
    }
}


async function authUserMiddleware(req,res,next) {


    const token = req.cookies.token;
    // console.log("Token",token);
    

    if(!token){
        return res.status(401).json ({
            message:"please log in first"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        req.user = user

        next()
    }catch(err){
         console.log("JWT ERROR:",err.message);
        return res.status(401).json({
            message:"inavlid token"
        })
    }


}

module.exports = {
   authFoodpartnerMiddleware,
   authUserMiddleware
}