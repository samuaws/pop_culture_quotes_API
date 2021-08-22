const express = require("express"),
    { isLoggedIn } = require("../middleware/auth"),
    {
        showPublicSavedQuotes,
        createSavedQuotes,
        showSpecificSavedQuotes,
        updateSavedQuotes,
        saveQuote,
        deleteSavedQuotes,
    } = require("../middleware/savedQuotes");
router = express.Router();

router.route("/").get(showPublicSavedQuotes).post(isLoggedIn, createSavedQuotes);

router.route("/:id").get(showSpecificSavedQuotes).all(isLoggedIn).put(updateSavedQuotes).delete(deleteSavedQuotes);

router.route("/:id/saveQuote").put(isLoggedIn, saveQuote);
module.exports = router;
