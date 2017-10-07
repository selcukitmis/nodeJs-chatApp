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

  // socket.on ile karşı taraftan birşey alınır
  // socket.emit ile karşı tarafa birşeyler yollanır

  // // browserdaki bir methodu tetikledik. ilk parametre browserdaki fonksiyonun adıdır.
  // socket.emit("newEmail", {
  //   from: "slck87@hotmail",
  //   text: "mail text"
  // });

  socket.emit("newMessage", {
    from: "From Server",
    text: "Keep this text browser",
    createdAt: 123
  });

  socket.on("createMessage", message => {
    console.log("createMessage", message);
  });

  // socket.on("createEmail", newEmail => {
  //   console.log("create email", newEmail);
  // });

  socket.on("disconnect", () => {
    console.log("User was disconnedted");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
