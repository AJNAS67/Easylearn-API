import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ChatDocument } from './model/model.chat';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<ChatDocument>,
  ) {}

  async createMessage(message: string, receiverId: string, senderId: string) {
    return await this.chatModel.create({
      sender: new mongoose.Types.ObjectId(senderId),
      receiver: new mongoose.Types.ObjectId(receiverId),
      message: message,
    });
  }
  async getChats(senderId: string, receiverId: string) {
    //  return this.chatModel.find({sender:senderId})

    console.log(senderId, 'sendrID');
    console.log(receiverId, 'sendrID');
    const chat = await this.chatModel
      .find({
        $or: [
          {
            sender: new mongoose.Types.ObjectId(senderId),
            receiver: new mongoose.Types.ObjectId(receiverId),
          },
          {
            sender: new mongoose.Types.ObjectId(receiverId),
            receiver: new mongoose.Types.ObjectId(senderId),
          },
        ],
      })
    console.log(chat, 'caht');
    return chat;
  }
}
