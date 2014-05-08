// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.all('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

}