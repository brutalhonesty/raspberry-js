//Node Server File
//Creates the server and listens for socket requests from the client.
var express = require('express');
var http = http = require('http');
var io = require('socket.io');
var sys = require('sys');
var exec = require('child_process').exec;
var path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 8080);
});

app.get('/', function (request, result) {
	result.sendfile(__dirname + '/index.html');
	app.use(express.static(path.join(__dirname, 'public')));
});

function puts(error, stdout, stderr) {
	sys.print(stdout);
	sys.print(stderr);
	if(error !== null) {
		console.log(error);
	}
}
function moveLeft() {
	exec("/usr/bin/python stepper-left.py", puts);
	console.log("Moved left!");
}

function moveRight() {
	exec("/usr/bin/python stepper-right.py", puts);
	console.log("Moved right!");
}
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
var io = io.listen(server, { 
	log: false 
});

io.sockets.on('connection', function (socket) {
	socket.on('moveLeft', function (data) {
		moveLeft();
	});
	socket.on('moveRight', function (data) {
		moveRight();
	});
});
