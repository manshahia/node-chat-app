var socket = io();

socket.on('connect', ()=>{
  console.log("Connected to server");

});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createAt).format("h:mm a");
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createAt).format("h:mm a");
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createAt: formattedTime,
    url: message.url
  });
  jQuery('#messages').append(html);

});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val("");
  });
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert("Geolocation not available");
  }

  locationButton.attr('disabled', 'disabled').text('Sending location ...');
  navigator.geolocation.getCurrentPosition( function( position )
  {
    locationButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function(error) {
    alert("Unable to fetch location");
    locationButton.removeAttr('disabled').text("Send Location");
  });
});
