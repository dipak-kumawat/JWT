const bcrypt = require("bcryptjs"); // Import bcrypt for hashing passwords

// Middleware to hash password before saving
const hashPasswordMiddleware = async function (next) {
  // Step 1: Check if the password is new or updated
  if (!this.isModified("password")) {
    return next(); // If password is not changed, skip hashing
  }

  try {
    // Step 2: Generate a salt (a random value to make the hash more secure)
    const salt = await bcrypt.genSalt(10); // '10' is the cost factor, higher is more secure but slower

    // Step 3: Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);

    next(); // Continue saving the user after hashing
  } catch (error) {
    next(error); // If there's an error, stop and return it
  }
};

module.exports = hashPasswordMiddleware; // Export the function to use in other files
