// app/routes.js

// load up the user model
var User = require('../app/models/user');

module.exports = function(app) {

    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.all('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.post('/join', function(req, res) {
        console.log(req.body);
    });

    app.get('/summoners', function(req, res) {
        User.find({}, function(users) {
            res.json(users);
        });
    });

}