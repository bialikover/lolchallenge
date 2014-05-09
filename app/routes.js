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

    // =====================================
    // Insert summoner on db ===============
    // =====================================

    app.post('/join', function(req, res) {
        console.log(req.body);
        var user_data = {
            fbid: req.body.user.fbid,
            name: req.body.user.name,
            email: req.body.user.email,
            summoner: req.body.user.summoner
        };

        var user = new User(user_data);

        user.save(function(error, data) {
            if (error) {
                res.json(error);
            } else {
                res.json(data);
            }
        });
    });

    // =====================================
    // Verify if a summoner exists =========
    // =====================================
    app.get('/summoner', function(req, res) {
        var user = JSON.parse(req.query.user);
        console.log(user);
        User.findOne({
            email: user.email
        }, function(err, obj) {
            console.log(obj);
            res.json(obj);
        });
    });

    // =====================================
    // List all summoners ==================
    // =====================================
    app.get('/summoners', function(req, res) {
        User.find({}, function(users) {
            res.json(users);
        });
    });

    app.get('/privacy-policy', function(req, res) {
        res.render('policy.ejs');
    });

}