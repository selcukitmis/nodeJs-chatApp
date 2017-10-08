const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const { generateMessage, generateLocationMessage } = require("./utils/message");

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

  // socket.emit("newMessage", {
  //   from: "From Server",
  //   text: "Keep this text browser",
  //   createdAt: 123
  // });

  // bu sadece bana gönderilir
  socket.emit("newMessage", generateMessage("admin", "sohbete hoş geldiniz"));

  // o an sitede olan herkesde çalışır, ben hariç
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "Yeni kullanıcı sohbete katıldı")
  );

  // // o an sitede olan herkesde çalışır, ben dahil
  // io.emit("newMessage", generateMessage("Admin", "Bu herkese gönderildi"));

  socket.on("createMessage", (message, callback) => {
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("İşlemi onayladım");
  });

  socket.on("createLocationMessage", coords => {
    io.emit("newLocationMessage", generateLocationMessage("Admin",coords.latitude,coords.longitude));
  });

  socket.on("disconnect", () => {
    console.log("User was disconnedted");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
