let mongoose = require("mongoose");

let campGroundSchema = new mongoose.Schema({
    price: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    name: String,
    url: String,
    description: String
});
module.exports = mongoose.model("campground", campGroundSchema);