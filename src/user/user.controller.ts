import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Request, response } from 'express';
import { userLogin } from 'src/interface/register.interface';
import { User } from './model/user.models';

@Controller('api')
export class UserController {
  constructor(
    private registerService: UserService,
    // private jwtService: JwtService,
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
  @Post('login')
  async userLogin(@Body() userDto: userLogin) {
    let email = userDto.email;
    const user = await this.registerService.findUser({ email });
    console.log(user, 'userrrrrrrrrrr');

    if (!user) {
      return { message: 'Email address is not Exist', status: false };
    }
    console.log(
      await bcrypt.compare(userDto.password, user.password),
      'llllllllllllllllllllllllooooooogggg',
    );

    if (!(await bcrypt.compare(userDto.password, user.password))) {
      // throw new BadRequestException('Password is incorrect');
      return { message: 'Password is incorrect', status: false };
    }

    // const jwt = await this.jwtService.signAsync({
    //   id: user.id,
    //   name: user.firstName,
    // });
    // console.log(jwt, 'jwt');

    // console.log(jwt, 'jt');
    // return { message: 'Login success fully', status: true, token: jwt };
    return { message: 'Login success fully', status: true };

  }

  // @Post('login')
  // async userLogin(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   console.log(email,'email');

  //   const user = await this.registerService.findUser({ email });
  //   if (!user) {
  //     console.log('no user');
  //     return { message: 'Email address is not Exist', status: false };

  //     // throw new BadRequestException('Invalid user');
  //   }
  //   if (!(await bcrypt.compare(password, user.password))) {
  //     // throw new BadRequestException('Password is incorrect');
  //     return { message: 'Password is incorrect', status: false };
  //   }
  //   console.log('have user');
  //   console.log(user,'userrrrrrrrrr');

  //   const jwt = await this.jwtService.signAsync({
  //     id: user.id,
  //     name: user.firstName,
  //   });
  //   response.cookie('jwt', jwt);
  //   console.log(jwt, 'jt');
  //   return { message: 'Login success fully', status: true, token: jwt };
  // }
  @Get()
  async findAll(): Promise<any[]> {
    return this.registerService.findAll();
  }
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() productData: userUpdate): Promise<any> {
  //   return this.registerService.update(id, productData);
  // }

  // @Get('ok')
  // getHello(): string {

  //   return 'Hello World!';
  // }
}
