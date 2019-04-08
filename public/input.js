var postBox;
var postButton;
var nameBox;
var passwordBox;
var joinButton;

function createPostBox() {
	postBox = document.createElement("TEXTAREA");
	postBox.id = "post";
	document.body.appendChild(postBox);
}

function createPostButton() {
	postButton = document.createElement("BUTTON");
	postButton.id = "post";
	postButton.addEventListener("click",
		function() {
			sendMessage(postBox.value)
		});
	var t = document.createTextNode("Post");
	postButton.appendChild(t);
	document.body.appendChild(postButton);
}

function createNameBox() {
	nameBox = document.createElement("INPUT");
	nameBox.id = "name";
	document.body.appendChild(nameBox);
}

function createPasswordBox() {
	passwordBox = document.createElement("INPUT");
	passwordBox.id = "password";
	document.body.appendChild(passwordBox);
}

function createJoinButton() {
	joinButton = document.createElement("BUTTON");
	joinButton.id = "join";
	joinButton.addEventListener("click",
		function() {
			connect(nameBox.value, passwordBox.value);
		});
	var t = document.createTextNode("Join");
	joinButton.appendChild(t);
	document.body.appendChild(joinButton);
}

function removePostBox() {
	document.body.removeChild(postBox);
}

function removePostButton() {
	document.body.removeChild(postButton);
}

function removeNameBox() {
	document.body.removeChild(nameBox);
}

function removePasswordBox() {
	document.body.removeChild(passwordBox);
}

function removeJoinButton() {
	document.body.removeChild(joinButton);
}