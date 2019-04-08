var socket;
var room;
var name;

function connect(aName, roomID) {
	room = roomID;
	name = aName;

	socket = io.connect('http://localhost:8000');
	var data = {
		roomID: room,
		name: name
	};

	socket.emit('start', data);

	socket.on('connected', function(data) {
		removeNameBox();
		removePasswordBox();
		removeJoinButton();
		createPostBox();
		createPostButton();
	});

	socket.on('failed', function(data) {
		alert("Password incorrect!");
	})

	socket.on('messageList', function(data) {
		parseList(data)
	});

	socket.on('message', function(data) {
		var para = document.createElement("p");
		var node = document.createTextNode(data.name + ": " + data.message);
		para.appendChild(node);
		document.body.appendChild(para);
	});
}


function parseList(data) {
	for (var i = 0; i < data.messages.length; i++) {
		var para = document.createElement("p");
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