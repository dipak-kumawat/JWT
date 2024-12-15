const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async (req, res) => {
  console.log("register endpoint hit");
  console.log('Request body:', req.body);
  const { username, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal server error");
  }
};


module.exports = { register };