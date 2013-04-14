$(function () {
	var socket = io.connect('http://localhost');

	var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    var prop;
	var element = document.createElement('div');

	for(var i = 0, l = props.length; i < l; i++) {
	    if(typeof element.style[props[i]] !== "undefined") {
	        prop = props[i];
	        break;
	    }
	}
	var xAngle = 0, yAngle = 0;
	$('body').keydown(function(evt) {
	    switch(evt.keyCode) {
	        case 37: // Left arrow
	            yAngle -= 90;
	            socket.emit('moveLeft');
	            break;
	        case 39: // Right arrow
	            socket.emit('moveRight');
	            yAngle += 90;
	            break;
	    };
	    document.getElementById('cube').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
	});

	socket.on('connect', function () {
		console.log('Socket connected');
		socket.on('moveLeft', function (data) {
			console.log('Socket received move left command');
			yAngle -= 90;
	    	document.getElementById('cube').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
		});
		socket.on('moveRight', function (data) {
			console.log('Socket received move right command');
			yAngle += 90;
	    	document.getElementById('cube').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
		});
	});
	$("div#cube").swipright(function () {
		console.log("Swipped right!");
	});
});