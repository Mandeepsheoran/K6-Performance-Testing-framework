import ws from 'k6/ws';

export default function () {
  const url = 'ws://echo.websocket.org';
  const resp = ws.connect(url, null, function (socket) {
    socket.on('open', function () {
      console.log('WebSocket connection established!');
      socket.close();
    });
  });
}
