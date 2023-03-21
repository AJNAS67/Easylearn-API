import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/model/user.models';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ type: mongoose.Types.ObjectId, ref: User.name })
  userId: mongoose.Types.ObjectId;

  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  pinCode: number;

  @Prop()
  phoneNumber: number;

  @Prop()
  dataofBirth: string;

  @Prop()
  state: string;

  @Prop()
  district: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
