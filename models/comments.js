let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    content: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, //what if a user changed his user name, So that's why it's important
            ref: "User"
        },
        username: String
    }
});
module.exports = mongoose.model("Comment", commentSchema);