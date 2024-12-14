const express = require("express");
const router = express.Router();
const {getWeather} = require("../controller/controller");

router.get("/weather", getWeather);


module.exports = router;
