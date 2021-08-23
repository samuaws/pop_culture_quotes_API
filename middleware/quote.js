const Quote = require("../models/quote");
module.exports = {
    createQuote : async (req, res) => {
        const { text,author,show } = req.body;
        try {
            const quote = await Quote.create({ text,author,show  });
            res.status(201).json(quote);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showQuote : async (req, res) => {
        const id = req.params.id;
        try {
            const quote = await Quote.findById(id);
            res.json(quote);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    editQuote : async (req, res) => {
        const { text,author,show } = req.body,
            id = req.params.id;
        try {
            const quote = await Quote.findById(id);
            quote.text = text ? text : quote.text;
            quote.author = author ? author : quote.author;
            quote.show = show ? show : quote.show;
            await quote.save();
            res.status(201).send(quote);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteQuote : async (req, res) => {
        try {
            const id = req.params.id,
                quote = await Quote.findById(id);
            await quote.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },
}