const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const foodPartnerModel = require('../models/foodPartner.model')


async function registerUser(req, res) {
    const { fullname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "user already exist "
        })

    }

    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await userModel.create({
        fullname,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });

    res.status(201).json({
        message: "user registered successfully ",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "invalid credentials"
        });
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });

    res.status(200).json({
        message: "login successful",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    });
}

async function logoutUser(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    res.status(200).json({
        message: "user logged out successfully"
    });
}



async function registerFoodPartner(req, res) {

    const { businessName,address, email, password } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "food partner account is already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({


        businessName,
        address,
        email,
        password: hashedPassword
    })
    const token = jwt.sign({
        id: foodPartner._id,

    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    
    res.status(201).json({
        message:"food partner registred successfuly ",
        foodPartner:{
            _id : foodPartner._id,
            email: foodPartner.email,
            businessName: foodPartner.businessName 
        }
    })
}



async function loginFoodPartner (req, res) {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(password, foodPartner.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "invalid email or Password"
        });
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false
});

    res.status(200).json({
        message: "login successful",
      foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            fullname: foodPartner.fullname
        }
    });
}

async function logoutFoodPartner(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    res.status(200).json({
        message: "user logged out successfully"
    });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}