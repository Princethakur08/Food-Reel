const express = require('express');
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware")
const foodController = require("../controllers/food.controller")
const multer =require('multer')
const upload = multer({
    storage: multer.memoryStorage(),
})


// Post /api/food/{protected}

router.post("/",authMiddleware.authFoodpartnerMiddleware,upload.single("video"), foodController.createFood)


// get /api/food [protected]
router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)

router.post("/like",authMiddleware.authUserMiddleware,
     foodController.likeFood)

router.post("/save",authMiddleware.authUserMiddleware,
        foodController.saveFood)

  router.get("/saved",
    authMiddleware.authUserMiddleware,
    foodController.getSavedFood
  )

module.exports = router