var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: {
    type: String
    // required: true
  },
  link: {
    type: String
    // required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var News = mongoose.model("News", newsSchema);

// Export the Article model
module.exports = News;