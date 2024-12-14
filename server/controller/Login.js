const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json(
      { message: "Login successful", token, userId: user._id, email: user.email }
    )
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};


module.exports = { login };
