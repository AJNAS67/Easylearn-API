import { jwtConstants } from '../constants';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { payloadInterface } from 'src/interface/register.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: payloadInterface) {
    return {
      email: payload.email,
      _id: payload._id,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
  }
}
