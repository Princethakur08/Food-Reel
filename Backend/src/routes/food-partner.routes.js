const express = require('express');




const foodPartnerController = require("../controllers/food-partner.controller")
const authMiddleware =  require("../../middleware/auth.middleware")
const foodController = require("../controllers/food.controller")

const router = express.Router();


// console.log("authUserMiddleware:", authMiddleware.authUserMiddleware);
// console.log("getFoodPartnerById:", foodPartnerController.getFoodPartnerById);

// get /api/food/food-partner/:id

router.get("/:id",
authMiddleware.authUserMiddleware,
foodPartnerController.getFoodPartnerById);


module.exports = router 