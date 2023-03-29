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
  async UserDetails(userDetals: Profile, id: any) {
    try {
      return await this.profileModel.create({
        userId: new mongoose.Types.ObjectId(id),
        fullName: userDetals.fullName,
        email: userDetals.email,
        pinCode: userDetals.pinCode,
        phoneNumber: userDetals.phoneNumber,
        dateofBirth: userDetals.dateofBirth,
        state: userDetals.state,
        district: userDetals.district,
        city: userDetals.city,
        address: userDetals.address,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getUserDetails(id: string) {
    return await this.profileModel.find({
      userId: new mongoose.Types.ObjectId(id),
    });
  }
}
