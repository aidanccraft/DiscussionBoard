var express = require('express');
var app = express();
var server = app.listen(8000, listen);

var rooms = [];

var temp = {
	roomID: "RoomTest",
	numUsers: 0,
	users: [],
	messages: [],
	names: [],
	colors: []
}
rooms.push(temp);

function listen() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Discussion board listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

io.sockets.on('connection',
	function (socket) {

		console.log("We have a new client: " + socket.id);


		socket.on('start',
			function (data) {
				for (var i = 0; i < rooms.length; i++) {
					if (data.roomID == rooms[i].roomID) {
						rooms[i].numUsers += 1;
						rooms[i].users[rooms[i].users.length] = {
							id: socket.id,
							name: data.name,
							color: chooseNameColor()
						};
						if (rooms[i].messages.length > 0) {
							io.to(socket.id).emit('messageList', {
								messages: rooms[i].messages,
								names: rooms[i].names,
								colors: rooms[i].colors
							});
						}
						io.to(socket.id).emit('connected', { color: rooms[i].users[rooms[i].users.length - 1].color });
						return;
					}
				}
				io.to(socket.id).emit('failed', {});
			}
		);

		socket.on('message', function (data) {
			var id;
			for (var i = 0; i < rooms.length; i++) {
				if (data.roomID == rooms[i].roomID) {
					id = i;
					for (var j = 0; j < rooms[i].users.length; j++) {
						if (socket.id == rooms[i].users[j].id) {
							var x = rooms[i].messages.length;
							rooms[i].messages[x] = data.message;
							rooms[i].names[x] = rooms[i].users[j].name + ": ";
							rooms[i].colors[x] = rooms[i].users[j].color;
						}
					}
				}
			}
			for (var k = 0; k < rooms[id].users.length; k++) {
				io.to(rooms[id].users[k].id).emit('message', data);
			}
		});

		socket.on('disconnect', function () {
			console.log("Client has disconnected");
			for (var i = 0; i < rooms.length; i++) {
				for (var j = 0; j < rooms[i].users.length; j++) {
					if (socket.id == rooms[i].users[j].id) {
						rooms[i].users.splice(j, 1);
						rooms[i].numUsers--;
						if (rooms[i].users.length == 0) {
							rooms[i]['numUsers'] = 0;
							rooms[i]['users'] = [];
							rooms[i]['messages'] = [];
							rooms[i]['names'] = [];
							rooms[i]['colors'] = [];
						}
					}
				}
			}
		});
	}
);

function chooseNameColor() {
	var x = Math.random();
	if (x < .2) {
		return "rgb(255, 0, 0)";
	} else if (x < .4) {
		return "rgb(255, 165, 0)";
	} else if (x < .6) {
		return "rgb(0, 255, 0)";
	} else if (x < .8) {
		return "rgb(0, 0, 255)";
	} else {
		return "rgb(255, 0, 255)";
	}
}