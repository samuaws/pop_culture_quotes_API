const mongoose = require("mongoose");

let contentSchema = new mongoose.Schema({
    text : {
        required: true,
        type: String,
    },
    
    quotes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "quotes",
        },
    ],
    cover : {
        required: true,
        type: String,
    },
    category : {
        required: true,
        type: String,
    }
});
module.exports = mongoose.model("content", contentSchema);