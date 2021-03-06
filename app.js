const savedQuotes = require("./models/savedQuotes");

const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    user = require("./models/user"),
    userRouter = require("./routes/user"),
    authRouter = require("./routes/auth"),
    quoteRouter = require("./routes/quote"),
    savedQuotesRouter = require("./routes/savedQuotes"),
    contentRouter = require("./routes/content"),

    //gameRouter = require("./routes/game"),
   // listRouter = require("./routes/list"),
   
    port=3000;

    app.use(express.json());
    app.use("/",authRouter);
    app.use("/users", userRouter);
    app.use("/quotes",quoteRouter);
    app.use("/contents",contentRouter);
    app.use("/savedQuotes",savedQuotesRouter);
    mongoose.set("debug", true); // in devolpment process
    mongoose
    .connect(
        "If you want the database conatct @yelyesye insta", 
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: "quotesAPI",
    })
    .then((con) => {
        console.log("Database is connected");
        app.listen(port, () => {
            console.log(`Server started on ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });
    



