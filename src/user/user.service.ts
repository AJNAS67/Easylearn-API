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
  async insertProduct(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    password: string,
  ) {
    console.log(firstName, 'ajnaskp');

    try {
      const newRegister = new this.RegisterModel({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
      const result = await newRegister.save();
      console.log(result, 'resultresult');

      return { result: result, status: true };
    } catch (error) {
      return { result: error.message, status: false };
      // console.log(error.message);
    }
  }
  async findUser(email: any) {
    return this.RegisterModel.findOne(email);
  }
  getHello() {
    console.log('hello');
  }
  
}
