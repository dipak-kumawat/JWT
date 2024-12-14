const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const varifyToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decode = jwt.varify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = { varifyToken };
