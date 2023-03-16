import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://ajnaskp203:<8UP0Fzs4tdpX86UQ>@cluster0.orlxzbx.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
