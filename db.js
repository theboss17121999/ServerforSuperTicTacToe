const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://bose:Tubu%40123@cluster0.kcq4538.mongodb.net/users");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
