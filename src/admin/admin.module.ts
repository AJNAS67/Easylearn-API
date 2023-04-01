import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({

  controllers: [AdminController],
  imports:[UserModule]
})
export class AdminModule {}
