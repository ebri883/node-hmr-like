const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server\n");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  const filePathCss = "./clientUI/style1.css";
  const filePathJs = "./clientUI/script.js";

  // Watch for changes in the file
  const fileWatcher = fs.watch(filePathCss, (eventType, filename) => {
    if (eventType === "change") {
      console.log("File CSS changed");

      // Read the updated content of the file
      fs.readFile(filePathCss, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading file: ${err}`);
          return;
        }

        // Send the updated content to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(`File content changed: ${data}`);
          }
        });
      });
    }
  });

  const scriptWatcher = fs.watch(filePathJs, (eventType, filename) => {
    if (eventType === "change") {
      console.log("File JS changed");

      // Read the updated content of the file
      fs.readFile(filePathJs, "utf8", (err, data) => {
        if (err) {
          console.error(`Error reading file: ${err}`);
          return;
        }

        // Send the updated content to all connected clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(`File content changed: ${data}`);
          }
        });
      });
    }
  });

  // Handle disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    // Stop watching the file when the client disconnects
    fileWatcher.close();
    scriptWatcher.close();
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
