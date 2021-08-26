const { findById } = require("../models/savedQuotes");
const Saved = require("../models/savedQuotes"),
    Quote = require ("../models/quote");
module.exports = {
    showPublicSavedQuotes : async (req, res) => {
        try {
            const saved = await Saved.find({ public: true });
            res.json(saved);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    showSpecificSavedQuotes : async (req, res) => {
        try {
            const id = req.params.id,
                saved = await Saved.findById(id);
                if(saved.public==false)
                {
                    throw Error("this list is private");
                }
            res.json(saved);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    updateSavedQuotes :  async (req, res) => {
        try {
            const id = req.params.id,
                { name, public } = req.body;
            let saved = await Saved.findById(id);
            if (saved.user !== req.user._id)
                throw new Error("You aren't allowed to edit this saved.");
            saved.name = name ? name : saved.name;
            saved.public = public ? public : saved.public;
            await saved.save();
            res.json(saved);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    deleteSavedQuotes : async (req, res) => {
        try {
            const id = req.params.id;
            let saved = await Saved.findById(id);
            if (saved.user._id.toString() !== req.user._id.toString())
            {
                throw new Error("You aren't allowed to delete this list.");
            }
            saved.remove();
            res.json({ deleted: "successfully" });
        } catch (e) {
            res.json({ error: e.message });
        }
    },
    saveQuote : async (req, res) => {
            const { id } = req.body;
        try {
            let quote = await Quote.findById(id),
            saved = req.user.savedQuotes;
            console.log(saved);   
            saved.quotes.push(quote);
            saved.save();
            res.json(saved);
        } catch (e) {
            res.json({ error: e.message });
        }
    },
}   