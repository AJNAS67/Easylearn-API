import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { RegisterSchema } from './user.model';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './model/user.models';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),

  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
