import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);


