var socket = io();
socket.on("connect", function() {
  // connect olduğunda çalışır
  //console.log("Connected to server");
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
  let li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("input[name='message']").val()
    },
    data => {
      console.log("Sunucu mesajı aldığını onayladı. Sunucu mesajı: ", data);
    }
  );
});
