import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './model/model.chat';
import { ChatGateway } from './gateway/chat.gatway';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    ChatModule,
  ],
  exports: [ChatService],
  providers: [ChatService,ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
