import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.models';
import { payloadInterface } from 'src/interface/register.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user')
    private readonly userModel: Model<UserDocument>,
  ) {}

  // register user
  async createUser(user: User): Promise<any> {
    try {
      const newUser = await new this.userModel(user).save();
      return { status: true };
    } catch (error) {
      return { status: false };
    }
  }
  async findAll() {
    return await this.userModel.find();
  }
  async findStudents(){
    return await this.userModel.find({ isAdmin: false });
    
  }
  async updateField(
    id: string,
    fieldToUpdate: string,
    newValue: any,
  ): Promise<any> {
    const updatedDoc = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: { [fieldToUpdate]: newValue } },
        { new: true },
      )
      .exec();
    return updatedDoc;
  }

  async findUser(email: any): Promise<any> {
    return this.userModel.findOne(email);
  }

  async findOne(email: any) {
    const user = await this.userModel.findOne(email);
    return user;
  }
  async getUserDetails(id: payloadInterface) {
    return await this.userModel.findById(id);
  }
  async getUserDtl(id: any) {
    return await this.userModel.findById(id._id);
  }
  async getAllAdmin() {
    return await this.userModel.find({ isAdmin: true });
  }
  async updateUserAdminStatus(userId: string, isAdmin: boolean): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, { isAdmin }, { new: true })
      .exec();
  }
  async updateUserBlockStatus(userId: string, isBlock: boolean): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, { isBlock }, { new: true })
      .exec();
  }
}
