import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
@WebSocketGateway({
  namespace: "/chat",
  cors: true,
  pingTimeout: 60000,
  pingInterval: 25000,
}) // <-- namespace /chat
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Socket;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("messageToServer")
  handleMessage(@MessageBody() data: { user: string; message: string }) {
    this.wss.emit("messageToClient", data);
  }
}
