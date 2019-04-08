var socket;
var room;
var name;

socket = io.connect('http://localhost:8000');

socket.on('connected', function(data) {
	removeNameBox();
	removePasswordBox();
	removeTitleP();
	removeJoinButton();
	createPostBox();
	createPostButton();
});

socket.on('failed', function(data) {
	alert("Incorrect Password!");
})

socket.on('messageList', function(data) {
	parseList(data)
});

socket.on('message', function(data) {
	var para = document.createElement("p");
	var x = document.createElement("SPAN");
	var t = document.createTextNode(data.name + ": ");
	x.appendChild(t);
	para.appendChild(x);
	var node = document.createTextNode(data.message);
	para.appendChild(node);
	document.body.appendChild(para);
});

function connect(aName, roomID) {
	room = roomID;
	name = aName;

	var data = {
		roomID: room,
		name: name
	};

	socket.emit('start', data);
}


function parseList(data) {
	for (var i = 0; i < data.messages.length; i++) {
		var para = document.createElement("p");
		var x = document.createElement("SPAN");
		var t = document.createTextNode(data.names[i]);
		x.appendChild(t);
		para.appendChild(x);
		var node = document.createTextNode(data.messages[i]);
		para.appendChild(node);
		document.body.appendChild(para);
	}
}

function sendMessage(message) {
	if (message !== "") {
		socket.emit('message', {
			message: message,
			roomID: room,
			name: name
		});
	}
}