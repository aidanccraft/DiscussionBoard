var postBox;
var postButton;
var nameBox;
var passwordBox;
var joinButton;
var nameP;
var passwordP;
var titleP;

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
			postBox.value = "";
		});
	var t = document.createTextNode("Post");
	postButton.appendChild(t);
	document.body.appendChild(postButton);
}

function createTitleP() {
	titleP = document.createElement("p");
	titleP.id = "title";
	var t = document.createTextNode("APLANG 6 Discussion");
	titleP.appendChild(t);
	document.body.appendChild(titleP);
}

function createNameBox() {
	nameBox = document.createElement("INPUT");
	nameBox.id = "name";
	document.body.appendChild(nameBox);
	nameP = document.createElement("p");
	nameP.id = "name";
	var t = document.createTextNode("Name:");
	nameP.appendChild(t);
	document.body.appendChild(nameP);
}

function createPasswordBox() {
	passwordBox = document.createElement("INPUT");
	passwordBox.id = "password";
	document.body.appendChild(passwordBox);
	passwordP = document.createElement("p");
	passwordP.id = "password";
	var t = document.createTextNode("Room Password:");
	passwordP.appendChild(t);
	document.body.appendChild(passwordP);
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

function removeTitleP() {
	document.body.removeChild(titleP);
}

function removeNameBox() {
	document.body.removeChild(nameBox);
	document.body.removeChild(nameP);
}

function removePasswordBox() {
	document.body.removeChild(passwordBox);
	document.body.removeChild(passwordP);
}

function removeJoinButton() {
	document.body.removeChild(joinButton);
}