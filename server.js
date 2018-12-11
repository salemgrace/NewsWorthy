var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Requires Models
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();


// Parse request body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


// Make public a static folder
app.use(express.static("public"));


// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Mongo -- Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);


// Routes
app.get("/scrape", function(req, res) {
    axios.get("https://nytimes.com/").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article.css-8atqhb").each(function(i, element) {
            var result = {};

            result.headline = $(this)
                .children("a")
                .text();
            result.summary = $(this)
                .children("a")
                .text();
            result.url = $(this)
                .children("a")
                .attr("href")

            db.News.create(result)
                .then(function(dbNews) {
                    console.log(dbNews);
                })
                .catch(function(err) {
                    return res.json(err);
                });
        });
        res.send("Scrape Complete!")
    });
});

app.get("/articles", function(req, res) {
    db.News.find({})
        .then(function(dbNews) {
            res.json(dbNews);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});