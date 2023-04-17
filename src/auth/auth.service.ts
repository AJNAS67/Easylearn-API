import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const user = await this.userService.findUser({ email });

    if (user === null) {
      throw new BadRequestException(`Couldn't find email !! please register`);
    } else {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        return user;
      } else {
        throw new UnauthorizedException('Wrong Password !!');
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
    if (user.email == process.env.ADMIN_EMAIL) {
      return {
        user,
        status: true,
        admin: true,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      return {
        user,
        status: true,
        admin: false,
        access_token: this.jwtService.sign(payload),
      };
    }
  }
  getHello() {
    return 'Hello';
  }
}
