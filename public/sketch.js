var socket;
var room = 100;
var name = "Draglantix";

socket = io.connect('http://localhost:8000');
var data = {
	roomID: room,
	name: name
};
socket.emit('start', data);
socket.emit('message', {
	message: "Test",
	roomID: room,
	name: name
});
socket.on('messageList', function(data) {
	parseList(data)
});
socket.on('message', function(data) {
	var para = document.createElement("p");
	var node = document.createTextNode(data.name + ": " + data.message);
	para.appendChild(node);
	document.body.appendChild(para);
});

function parseList(data) {
	for (var i = 0; i < data.messages.length; i++) {
		var para = document.createElement("p");
		var node = document.createTextNode(data.messages[i]);
		para.appendChild(node);
		document.body.appendChild(para);
	}
}