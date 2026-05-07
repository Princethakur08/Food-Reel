const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const foodRoutes = require('./routes/food.routes')
const foodPartnerRoutes = require('./routes/food-partner.routes')
const cors = require('cors');


const app = express();

app.use(cors({
    origin: [
  "http://localhost:5173",
  "https://food-reel-los7.onrender.com"
],
    credentials: true
}));

app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res) => {

    res.send("Kam se Kam ye to chal raha hai")

})
app.use('/api/auth', authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/food-partner", foodPartnerRoutes)



// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error("🔥 FULL ERROR:", err);  // shows complete error in terminal

    res.status(500).json({
        message: err.message,
        stack: err.stack   // optional (remove in production)
    });
});

module.exports = app;