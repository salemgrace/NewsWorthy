var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");

// Requires Models
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

var routes = require("./routes");

app.use(logger("dev"));
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
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NPRnews";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});