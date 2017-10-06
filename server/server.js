const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
// uygulamanın çalışacağı yer
app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("new user connected");
  socket.on("disconnect",() => {
      console.log("User was disconnedted");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
