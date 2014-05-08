// set up ======================================================================
// get all the tools we need
var newrelic = require('newrelic');
var express = require('express');
var connect = require('connect');
var mongoose = require('mongoose');
var flash = require('connect-flash');


var app = express();
var port = process.env.PORT || 8888;

var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


// set up our express application
app.use(connect.logger('dev')); // log every request to the console
app.use(connect.cookieParser()); // read cookies (needed for auth)
app.use(connect.bodyParser()); // get information from html forms

// set up assets
app.use("/images", express.static(__dirname + '/views/images'));
app.use("/css", express.static(__dirname + '/views/css'));
app.use("/js", express.static(__dirname + '/views/js'));

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(flash()); // use connect-flash for flash messages stored in session



// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);