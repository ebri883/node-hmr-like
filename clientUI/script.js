const messages = document.getElementById("messages");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

function changeCss() {
  const cssImport = document.getElementById("style");
  cssImport.setAttribute("href", "./style1.css");
}

function changeJs() {
  const jsImport = document.getElementById("script");

  if (jsImport?.getAttribute("src") === "script.js") {
    jsImport.setAttribute("src", "./script.js");
  } else {
    jsImport.setAttribute("src", "script.js");
  }
}

const socket = new WebSocket("ws://localhost:3000");

// Connection opened
socket.addEventListener("open", (event) => {
  console.log("Connected to WebSocket server");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  changeCss();
  changeJs();
  console.log("test2");
});

// Connection closed
socket.addEventListener("close", (event) => {
  console.log("Connection closed");
});

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = "";
}

console.log("test");
