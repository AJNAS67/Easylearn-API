import { Injectable, BadRequestException } from '@nestjs/common';
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
  async createUser(user: User): Promise<any> {
    // try {
    //   const newUser = new this.userModel(user);
    //   return newUser.save();
    // } catch (error) {
    //   throw new BadRequestException(error.message);

    // }
    try {
      const newUser = await new this.userModel(user).save();
      return { status: true };
    } catch (error) {
      return { status: false };
    }
  }
  async findAll(){
    return await this.userModel.find()

  }
  async updateField(id: string, fieldToUpdate: string, newValue: any): Promise<any> {
    const updatedDoc = await this.userModel.findByIdAndUpdate(
      id,
      { $set: { [fieldToUpdate]: newValue } },
      { new: true }
    ).exec();
    return updatedDoc;
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
  async findUser(email: any): Promise<any> {
    return this.userModel.findOne(email);
  }
  // getHello() {
  //   console.log('hello');
  // }
  // findAll() {
  //   return this.RegisterModel.find();
  // }
  // async update(id: string, productData: userUpdate): Promise<userUpdate> {
  //   return this.RegisterModel.findByIdAndUpdate(id, productData, { new: true });
  // }
  async findOne(email: any) {
    console.log(email,'emailllllllllllllllll');
    
    
    const user = await this.userModel.findOne(email);
    return user;
  }
}
