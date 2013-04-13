$(function () {
	/*
	$.extend({
		initial: function () {
			var socket = io.connect('http://localhost');
			$.moveLeft(socket);
			$.moveRight(socket);
			$.speedSlider(socket);
			$.duration(socket);
		},
		moveLeft: function (socket) {
			$("button#moveLeft").on('click', function() {
				console.log("Move Left Button Pressed!");
				socket.emit('moveLeft', {value: true});
			});
		},
		moveRight: function (socket) {
			$("button#moveRight").on('click', function() {
				console.log("Move Right Button Pressed!");
				socket.emit('moveRight', {value: true});
			});
		},
		speedSlider: function(socket) {
			$("input#speedSlider").change(function() {
				$("span#speedCurrentValue").html(this.value);
				console.log("Speed Slider value: " + this.value);
				socket.emit('speedSlider', {value: this.value});
			});
			$("input#speedSlider").change();
		},
		duration: function (socket) {
			$("input#durationSlider").change(function() {
				$("span#durationCurrentValue").html(this.value);
				console.log("Duration Slider value: " + this.value);
				socket.emit('durationSlider', {value: this.value});
			});
			$("input#durationSlider").change();
		}
	});
	$.initial();
	*/

	var socket = io.connect('http://localhost');

	var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
    	prop,
    	el = document.createElement('div');

	for(var i = 0, l = props.length; i < l; i++) {
	    if(typeof el.style[props[i]] !== "undefined") {
	        prop = props[i];
	        break;
	    }
	}

	var xAngle = 0, yAngle = 0;
	$('body').keydown(function(evt) {
	    switch(evt.keyCode) {
	        case 37: // left
	            yAngle -= 90;
	            socket.emit('moveLeft', {duration: 250});
	            break;

	        /*
	        case 38: // up
	            xAngle += 90;
	            break;
	        */

	        case 39: // right
	            socket.emit('moveRight', {duration: 250});
	            yAngle += 90;
	            break;

	        /*
	        case 40: // down
	            xAngle -= 90;
	            break;
	        */
	    };
	    document.getElementById('cube').style[prop] = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
	});
});