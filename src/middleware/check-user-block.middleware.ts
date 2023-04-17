import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BlockMiddleware implements NestMiddleware {
  constructor(private _userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7, authHeader.length);
      const decoded: any = jwt.verify(token, jwtConstants.ACCESS_TOKEN_SECRET);
      req.user = decoded;
    }
    const user = await this._userService.getUserDtl(req.user);
    if (user.isBlock) {
      throw new HttpException(
        'You are blocked from accessing this resource',
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }
}
