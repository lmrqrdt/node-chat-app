const socket = io();

socket.on('updateRoomList', function (rooms) {
  const datalist = $('#rooms').empty();

  rooms.forEach(function (room) {
    datalist.append('<option value="' + room.name + '">' + room.numUsers + '</option>');
  });

  // let ol = $('<ol></ol>');
  //
  // rooms.forEach(function (room) {
  //   ol.append($('<li></li>').text(room));
  // });
  //
  // $('#rooms').html(ol);
});

socket.emit('displayRoomList', (err) => {
  if (err) {
    alert('There are no active chat rooms, please create one.')
  }
});
