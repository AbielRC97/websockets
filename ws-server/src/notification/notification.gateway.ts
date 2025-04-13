import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: '/notifications',
  cors: true,
  pingTimeout: 60000,
  pingInterval: 25000,
}) // <-- namespace /notifications
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('notify')
  handleNotify(@MessageBody() data: string) {
    this.server.emit('notification', data);
  }
}
