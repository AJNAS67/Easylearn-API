import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Req() req: any) {
    console.log(req.user,'looooo1');
    
    return this.authService.login(req.user);
  }
}
