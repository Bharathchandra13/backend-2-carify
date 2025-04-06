const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    role: {
        type: String,
        required: [true, "Please specify a role (e.g., user or garage)"]
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
});

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login;
