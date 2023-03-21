import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './model/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('profile')
    private readonly profileModel: Model<ProfileDocument>,
  ) {}
  async UserDetails(userDetals: Profile) {
    try {
      return await this.profileModel.create(userDetals);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
