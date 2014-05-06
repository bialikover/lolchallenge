var express = require("express");
var logfmt = require("logfmt");
var app = express();

//app.use(express.static(path.join(__dirname, 'html')));
app.use("/images", express.static(__dirname + '/images'));
app.use("/css", express.static(__dirname + '/css'));
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    res.sendfile('./step2.html');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});