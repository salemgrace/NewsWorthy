var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var PORT = process.env.PORT || 8080;

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
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});