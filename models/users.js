let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
})
mongoose.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);