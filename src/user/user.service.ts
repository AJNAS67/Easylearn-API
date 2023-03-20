import { Injectable } from '@nestjs/common';
import { userRegister, userUpdate } from 'src/interface/register.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.models';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly userModel: Model<UserDocument>,
  ) {}

  // register user
  async createUser(user: User): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      return newUser.save();
    } catch (error) {}
  }

  // async insertProduct(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   phoneNumber: number,
  //   password: string,
  // ) {
  //   console.log(firstName, 'ajnaskp');

  //   try {
  //     const newRegister = new this.RegisterModel({
  //       firstName,
  //       lastName,
  //       email,
  //       phoneNumber,
  //       password,
  //     });
  //     const result = await newRegister.save();
  //     console.log(result, 'resultresult');

  //     return { result: result, status: true };
  //   } catch (error) {
  //     return { result: error.message, status: false };
  //     // console.log(error.message);
  //   }
  // }
  // async findUser(email: any) {
  //   return this.RegisterModel.findOne(email);
  // }
  // getHello() {
  //   console.log('hello');
  // }
  // findAll() {
  //   return this.RegisterModel.find();
  // }
  // async update(id: string, productData: userUpdate): Promise<userUpdate> {
  //   return this.RegisterModel.findByIdAndUpdate(id, productData, { new: true });
  // }
}
