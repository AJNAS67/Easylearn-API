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


export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
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
