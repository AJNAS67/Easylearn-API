import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authServece: AuthService) {
    super(); //config
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authServece.validateUser(email, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return user;
  }
}
