import { jwtConstants } from 'src/auth/constants';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: [jwtConstants.CLIENT_URL] },
  namespace: '/chat',
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private _chatService: ChatService) {}
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('sendMessage')
  handleEvent(@MessageBody() body: any, socket: Socket) {
    this._chatService
      .createMessage(body.message, body.receiverId, body.senderId)
      .then((newMessage) => {
        this.server.emit('receiveMessage', {
          msg: 'new Message',
          content: newMessage,
        });
      });
  }


  @SubscribeMessage('join-room')
  subscribeJoinRoom(socket: Socket, roomId: string) {
    socket.join(roomId);
  }

  @SubscribeMessage('leave-room')
  subscribeLeaveRoom(socket: Socket, roomId: string) {
    socket.leave(roomId);
  }
}
