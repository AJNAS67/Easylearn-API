import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/user/model/user.models';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Request } from 'express';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService,
    private registerService: UserService,
    
    ) {}


  @Post('register')
  async RegisterUser(@Body() userDto: User) {
    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    userDto.password = hashedPassword;

    const user = await this.registerService.createUser(userDto);
    console.log(user, 'user111');
    if (user.status) {
      return { message: 'Successfully Registerd', isAdded: true };
    } else {
      return { message: 'Email alredy exist', isAdded: false };
    }
  }



  @UseGuards(LocalAuthGuard)

  @Post('auth/login')
  async login(@Req() req: Request) {
    console.log(req.user,'ajnas');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  checkAuth(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return { user: req.user, token: token };
  }



  @Get('pro')
  async GetHello(){
    return this.authService.getHello()

  }
  
}
