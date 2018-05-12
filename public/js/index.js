const socket = io();

socket.on('updateRoomList', function (rooms) {
  let ol = $('<ol></ol>');

  rooms.forEach(function (room) {
    ol.append($('<li></li>').text(room));
  });

  $('#rooms').html(ol);
});

socket.emit('displayRoomList', (err) => {
  if (err) {
    alert('There are no active chat rooms, please create one.')
  }
});
