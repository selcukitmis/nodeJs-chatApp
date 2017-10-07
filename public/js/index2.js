var socket = io();
socket.on("connect", function() {
  // connect olduğunda çalışır
  console.log("Connected to server");
  socket.emit("createMessage", { from: "Selçuk", text: "çalıştı" });
});

socket.on("disconnect", function() {
  // server disconnect olduğunda çalışır
  console.log("Disconnedted from server");
});

// socket.on("newEmail", email => {
//   console.log("new email", email);
// });

socket.on("newMessage", message => {
  console.log("new message", message);
});
