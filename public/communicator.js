var socket;
var room;
var name;
var color;

socket = io.connect('http://localhost:8000');
createTitleP();
createNameBox();
createPasswordBox();
createJoinButton();

socket.on('connected', function (data) {
	color = data.color;
	removeNameBox();
	removePasswordBox();
	removeTitleP();
	removeJoinButton();
	createPostBox();
	createPostButton();
});

socket.on('failed', function (data) {
	alert("Incorrect Password!");
})

socket.on('messageList', function (data) {
	parseList(data)
});

socket.on('message', function (data) {
	var para = document.createElement("p");
	var x = document.createElement("SPAN");
	x.id = "color";
	x.style.color = data.color;
	var t = document.createTextNode(data.name + ": ");
	x.appendChild(t);
	para.appendChild(x);
	var node = document.createTextNode(data.message);
	para.appendChild(node);
	document.body.appendChild(para);
	scroll();
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
		x.id = "color";
		x.style.color = data.colors[i];
		var t = document.createTextNode(data.names[i]);
		x.appendChild(t);
		para.appendChild(x);
		var node = document.createTextNode(data.messages[i]);
		para.appendChild(node);
		document.body.appendChild(para);
	}
	scroll();
}

function sendMessage(message) {
	if (message !== "") {
		socket.emit('message', {
			message: message,
			roomID: room,
			name: name,
			color: color
		});
	}
}


function scroll() {
	var scrollingElement = document.body;
	scrollingElement.scrollTop = scrollingElement.scrollHeight;
}