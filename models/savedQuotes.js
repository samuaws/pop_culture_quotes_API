const mongoose = require("mongoose");

let savedQuoteSchema = new mongoose.Schema({
    public: { type: Boolean, default: false },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    quotes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "quotes",
        },
    ],
});
module.exports = mongoose.model("savedQuotes", savedQuoteSchema);
