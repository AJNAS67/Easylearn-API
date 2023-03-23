import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    private jwtService:JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
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
      phone: user.phone,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return {
      user,
      status: true,
      access_token: this.jwtService.sign(payload),
    };
  }
}
