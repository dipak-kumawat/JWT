const express = require("express");
const router = express.Router();
const {getWeather} = require("../controller/controller");
const {register} = require("../controller/Register");
const {login} = require("../controller/Login");
const {varifyToken} = require("../middleware/authentication");

router.get("/weather",varifyToken, getWeather);
router.post("/register", register);
router.post("/login", login);



module.exports = router;  
 