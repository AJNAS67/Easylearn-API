import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/model/user.models';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  receiver: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: User.name,
  })
  sender: mongoose.Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
