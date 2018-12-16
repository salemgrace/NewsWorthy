// Routes
app.get("/scrape", function(req, res) {
    axios.get("https://www.npr.org/sections/news/").then(function(response) {
        var $ = cheerio.load(response.data);

        $(".title").each(function(i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // result.headline = $(this)
            //     .children("a")
            //     .text();
            // result.summary = $(this)
            //     .children("a")
            //     .text();
            // result.url = $(this)
            //     .children("a")
            //     .attr("href");

            db.Article.create(result)
                .then(function(Article) {
                    console.log(Article);
                })
                .catch(function(err) {
                    return res.json(err);
                });
        });
        res.send("Scrape Complete!")
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.get("/", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            console.log("testing finding articles", dbArticle);
            res.render("index", dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});