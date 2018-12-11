$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + 
        data[i].summary + "<br />" + data[i].url + "</p>");
    }
});

console.log("help")