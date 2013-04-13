
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , io = require('socket.io')
  , sys = require('sys')
  , exec = require('child_process').exec
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', routes.index);
//app.get('/users', user.list);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
  app.use(express.static(path.join(__dirname, 'public')));
});

function puts(error, stdout, stderr) { sys.puts(stdout) }

function moveLeft() {
	exec("ls -la", puts);
}

function moveRight() {
	exec("ls -la", puts);
}

function speedSlider() {

}

function durationSlider() {

}
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
var io = io.listen(server, { log: false });

io.sockets.on('connection', function (socket) {
  socket.on('moveLeft', function (data) {
    console.log('move left: ' + JSON.stringify(data));
    moveLeft();
  });
  socket.on('moveRight', function (data) {
    console.log('move right: ' + JSON.stringify(data));
    moveRight();
  });
  socket.on('speedSlider', function (data) {
    console.log('speedSlider: ' + JSON.stringify(data));
    speedSlider();
  });
  socket.on('durationSlider', function (data) {
    console.log('durationSlider: ' + JSON.stringify(data));
    durationSlider();
  });
});

