const http = require("http");
const express = require("express");
const app = express();
const ws = require("ws");
const port = 9000;

const server = http.createServer(app);

const wss = new ws.Server({ server });

wss.on("connection", (ws) => {
  //connection is up, let's add a simple simple event
  ws.on("message", (message) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send("Hi there, I am a WebSocket server");
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World! v14");
});

app.get("/test", (req, res) => {
  res.send("Goodby cruel world! v14");
});

//start our server
server.listen(port, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
