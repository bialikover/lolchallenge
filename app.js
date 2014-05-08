var express = require("express");
var logfmt = require("logfmt");
var app = express();

//app.use(express.static(path.join(__dirname, 'html')));
app.use("/images", express.static(__dirname + '/images'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use(logfmt.requestLogger());

app.all('/', function(req, res) {
    res.sendfile('./index.html');
});


var port = Number(process.env.PORT || 8888);
app.listen(port, function() {
    console.log("Listening on " + port);
});