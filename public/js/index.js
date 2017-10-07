var socket = io();
socket.on("connect", function() {
  // connect olduğunda çalışır
  console.log("Connected to server");

  //   socket.emit("createEmail", {
  //     to: "to address",
  //     text: "hey this is ansder"
  //   });

  socket.emit("createMessage", {
    from: "From browser",
    text: "Keep this text server"
  });
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
