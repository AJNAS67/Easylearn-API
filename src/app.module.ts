import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    UserModule,
    
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ProfileModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// 'mongodb+srv://ajnaskp203:8UP0Fzs4tdpX86UQ@cluster0.orlxzbx.mongodb.net/testdb?retryWrites=true&w=majority',
