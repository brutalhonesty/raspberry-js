$(function () {
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
});