const mongoose = require("mongoose");
// const hashPasswordMiddleware = require("../middlewares/hashPassword");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {  
        type: String,
        required: true,
    },
});

// userSchema.pre("save", hashPasswordMiddleware);  


module.exports = mongoose.model("User", userSchema);