import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { userLogin } from 'src/interface/register.interface';
import { User } from './model/user.models';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('api')
export class UserController {
  constructor(private registerService: UserService) {}
  @Post('register')
  async RegisterUser(@Body() userDto: User) {
    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    userDto.password = hashedPassword;

    const user = await this.registerService.createUser(userDto);
    console.log(user, 'user111');
    if (user.status) {
      return { message: 'Successfully Registered', isAdded: true };
    } else {
      return { message: 'Email already exist', isAdded: false };
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

    return { message: 'Login success fully', status: true };
  }

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

  @UseGuards(JwtAuthGuard)
  @Get('userDetails')
  async userDetails(@Req() req): Promise<any> {
    return await this.registerService.getUserDetails(req.user._id);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.registerService.findAll();
  }
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() productData: userUpdate): Promise<any> {
  //   return this.registerService.update(id, productData);
  // }

  @Get('isAdmin')
  async getAllAdmin() {
    return this.registerService.getAllAdmin();
  }
  @Get('get_numberOf_User')
  async getNumberOfUsers() {
    return this.registerService.getUserCount();
  }
  @Get('get_numberOf_mentor')
  async getNumberOfMentor() {
    return this.registerService.getNumberOfMentor();
  }
}
