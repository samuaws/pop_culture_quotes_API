const mongoose = require("mongoose");
 quoteSchema = new mongoose.Schema({
     text : {
        required: true,
        type: String,
    },
    author : {
        required: true,
        type: String,
    },
    show : {
        required: true,
        type: String,
    },
 })
 module.exports = mongoose.model("quote", quoteSchema);