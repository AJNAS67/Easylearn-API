import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { RegisterSchema } from './user.model';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Register', schema: RegisterSchema }]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),

  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
