const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;