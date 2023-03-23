import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authServece: AuthService) {
    super({ usernameField: 'email' })
  }
  async validate(email: string, password: string): Promise<any> {
    console.log(email);
    
    console.log('hiiiiiiiiiiiii1111111111111111111111111');
    const user = await this.authServece.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('9999999999999999999999999999999999');
    
    console.log(user,'userrrrrrrrrrrrrr');
    
    return user;
  }
}
