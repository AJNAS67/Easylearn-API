import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/model/user.models';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: any, password: any) {
    console.log('iiiiiiiiiiiiiii');

    console.log(email, 'kjhgggggggg');

    const user = await this.userService.findUser({ email });
    console.log(user, 'dfghjk');
    // return user

    if (user === null) {
      throw new BadRequestException('Couldnt find user');
    } else {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        return user;
      } else {
        throw new UnauthorizedException('Password or username is invalid');
      }
    }
  }

  login(user: any) {
    const payload = {
      email: user.email,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      user,
      status: true,
      access_token: this.jwtService.sign(payload),
    };
  }
  getHello() {
    return 'Hello';
  }
}
