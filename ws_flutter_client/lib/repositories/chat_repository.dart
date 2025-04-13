import 'package:socket_io_client/socket_io_client.dart' as IO;

class ChatRepository {
  late IO.Socket socket;

  void connect(Function(Map<String, dynamic>) onMessageReceived) {
    socket = IO.io('http://localhost:3000/chat',
      IO.OptionBuilder().setTransports(['websocket']).build());

    socket.connect();

    socket.onConnect((_) => print('✅ Conectado al servidor'));
    socket.on('messageToClient', (data) => onMessageReceived(data));
  }

  void sendMessage(String user, String message) {
    socket.emit('messageToServer', {'user': user, 'message': message});
  }

  void disconnect() {
    socket.disconnect();
  }
}
