// set up ======================================================================
// get all the tools we need
var newrelic = require('newrelic');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration


app.configure(function() {

    // set up our express application
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms

    // set up assets
    app.use("/images", express.static(__dirname + 'views/images'));
    app.use("/css", express.static(__dirname + 'views/css'));

    app.set('view engine', 'ejs'); // set up ejs for templating

    // required for passport
    app.use(express.session({
        secret: 'lolchallengeisafacebookappforleagueoflegendsfans'
    })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);








var logfmt = require("logfmt");
var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: "685626324807687",
        clientSecret: "6b49e6745da52fa2b71849289c53384d",
        callbackURL: "http://damp-river-6461.herokuapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
    }
));

var app = express();

//app.use(express.static(path.join(__dirname, 'html')));
app.use("/images", express.static(__dirname + 'views/images'));
app.use("/css", express.static(__dirname + 'views/css'));
app.use(logfmt.requestLogger());

app.all('/', function(req, res) {
    res.sendfile('./step2.html');
});

app.get('auth/facebook', passport.authenticate('facebook', {
    scope: ['read_stream', 'publish_actions']
}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});