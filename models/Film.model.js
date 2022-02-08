const { model, Schema } = require("mongoose");

const filmSchema = new Schema({
    name: String,
    releaseDate: String,
    picture: String,
    description: String,
    genre:[],
    crew: [],
    cast: [],
    videos: []
})

module.exports = model("Film", filmSchema);