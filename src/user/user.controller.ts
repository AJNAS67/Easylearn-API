import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Request, response } from 'express';
import { userLogin } from 'src/interface/register.interface';
import { User } from './model/user.models';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('api')
export class UserController {
  constructor(
    private registerService: UserService,
  ) 
  {}
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

    if (!user) {
      return { message: 'Email address is not Exist', status: false };
    }
   

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

  // @UseGuards(JwtAuthGuard)
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadImage(@Req() req, @UploadedFile() file: Express.Multer.File) {
  //   console.log(req.user, 'user');
  //   const result=await this.cloudinaryService.uploadFile(file);
  //   console.log(result,'result');
    
  //   return result
  // }

  @Patch(':id/:profile_pic/:value')
  async updateField(
    @Param('id') id: string,
    @Param('profile_pic') profile_pic: string,
    @Param('value') value: any,
  ) {
    const updatedDoc = await this.registerService.updateField(
      id,
      profile_pic,
      value,
    );
    console.log(updatedDoc);

    return updatedDoc;
  }

  
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
