import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './model/profile.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'profile', schema: ProfileSchema }]),

  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
