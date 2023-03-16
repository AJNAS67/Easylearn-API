import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';


@Controller('api')
export class UserController {
  constructor(
    private registerService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('register')
  async RegisterUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,

    @Body('email') email: string,
    @Body('phoneNumber') phoneNumber: number,
    @Body('password') password: string,
  ) {
    console.log(firstName, 'firstnassssssme');
    console.log(email, 'emailemail');
    console.log(password, 'pass');
    console.log(phoneNumber, 'phone number');

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(firstName, 'first name');

    const user = await this.registerService.insertProduct(
      firstName,
      lastName,
      email,
      phoneNumber,
      hashedPassword,
    );
    console.log(user, 'user111');
    delete user['password'];
    if (user.status) {
      return { message: 'Successfully Registerd', isAdded: true };
    } else {
      return { message: 'Email alredy exist', isAdded: false };
    }
  }
  @Post('login')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(email,'email');
    
    const user = await this.registerService.findUser({ email });
    if (!user) {
      console.log('no user');
      return { message: 'Email address is not Exist', status: false };

      // throw new BadRequestException('Invalid user');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      // throw new BadRequestException('Password is incorrect');
      return { message: 'Password is incorrect', status: false };
    }
    console.log('have user');
    console.log(user,'userrrrrrrrrr');
    

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      name: user.firstName,
    });
    response.cookie('jwt', jwt);
    console.log(jwt, 'jt');
    return { message: 'Login success fully', status: true, token: jwt };
  }

  @Get('ok')
  getHello(): string {
    return 'Hello World!';
  }
}
