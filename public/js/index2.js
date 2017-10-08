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
  const formattedTime = moment(message.createdAt).format("LLL");
  // let li = jQuery("<li></li>");
  // li.text(`${message.from} - ${formattedTime}: ${message.text}`);
  // $("#messages").append(li);

  const template = jQuery("#message-template").html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $("#messages").append(html);
});

socket.on("newLocationMessage", function(message) {
  const formattedTime = moment(message.createdAt).format("LLL");
  // let li = jQuery("<li></li>");
  // let a = jQuery("<a target='_blank'>My Current Location</a>");
  // li.text(`${message.from} - ${formattedTime}: `);
  // a.attr("href", message.url);
  // li.append(a);
  // $("#messages").append(li);

  const template = jQuery("#location-message-template").html();
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url:message.url
  });
  $("#messages").append(html);


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
      jQuery("[name=message]").val("");
    }
  );
});

let locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser");
  }
  locationButton.attr("disabled", true).text("Sending Location...");
  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr("disabled").text("Send Location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr("disabled").text("Send Location");
      alert("Unable to fetch location.");
    }
  );
});
