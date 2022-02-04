const { model, Schema } = require("mongoose")

const commentSchema = new Schema({
    content: String,
    date: Date,   //new Date().toLocaleDateString()
    author: { type: Schema.Types.ObjectId, ref: "User" },
    film: { type: Schema.Types.ObjectId, ref: "Film" }
})

module.exports = model("Comment", commentSchema);