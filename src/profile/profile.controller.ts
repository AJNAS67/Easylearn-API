import { Body, Controller, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './model/profile.model';

@Controller('')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Post('profile')
  async RegisterUser(@Body() profileDto: Profile) {
    const userDetails = await this.profileService.UserDetails(profileDto);
    console.log(userDetails,'loggggggggggggggg');
    return {userDetails}
    
  }
}
