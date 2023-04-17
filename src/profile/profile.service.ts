import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Profile, ProfileDocument } from './model/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('profile')
    private readonly profileModel: Model<ProfileDocument>,
  ) {}
  async UserDetails(userDetails: Profile, id: string) {
    try {
      return await this.profileModel.create({
        userId: new mongoose.Types.ObjectId(id),
        fullName: userDetails.fullName,
        email: userDetails.email,
        pinCode: userDetails.pinCode,
        phoneNumber: userDetails.phoneNumber,
        dateofBirth: userDetails.dateofBirth,
        state: userDetails.state,
        district: userDetails.district,
        city: userDetails.city,
        address: userDetails.address,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async uploadProfile(userDetails: Profile, id1: any) {
    let id = new mongoose.Types.ObjectId(id1);
    return await this.profileModel.findOneAndUpdate({ id }, userDetails);
  }
  async getUserDetails(id: string) {
    return await this.profileModel.find({
      userId: new mongoose.Types.ObjectId(id),
    });
  }
}
