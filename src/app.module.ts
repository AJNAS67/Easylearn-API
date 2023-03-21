import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb+srv://ajnaskp67:W25SduyAT27lcr0s@cluster0.ykjfftm.mongodb.net/?retryWrites=true&w=majority'),
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 'mongodb+srv://ajnaskp203:8UP0Fzs4tdpX86UQ@cluster0.orlxzbx.mongodb.net/testdb?retryWrites=true&w=majority',
