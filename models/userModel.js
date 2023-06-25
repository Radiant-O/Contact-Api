const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please Input username"]
    },
    mail:{
        type: String,
        required: [true, "Please Input user mail"],
        unique: [true, "mail address already taken"]
    },
    password:{
        type: String,
        required: [true, "Please add user password"]
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);