import { Injectable } from '@nestjs/common';
import { userRegister } from 'src/interface/register.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('Register')
    private readonly RegisterModel: Model<userRegister>,
  ) {}
}
