import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './model/profile.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from 'src/user/user.service';

@Controller('')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private readonly _cloudinaryService: CloudinaryService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('get_user_details')
  async getUserDetails(@Req() req): Promise<any[]> {
    const userDetails = await this.profileService.getUserDetails(req.user._id);

    return userDetails;
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async RegisterUser(@Req() req, @Body() profileDto: Profile) {
    const userDetails = await this.profileService.UserDetails(
      profileDto,
      req.user._id,
    );

    return { userDetails };
  }

  @UseGuards(JwtAuthGuard)
  @Put('update_profile')
  async updateUser(@Req() req, @Body() profileDto: Profile) {
    const user = await this.profileService.uploadProfile(
      profileDto,
      req.user._id,
    );
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const uploaded = await this._cloudinaryService.uploadFile(file);
    await this.userService.updateField(
      req.user._id,
      'profile_pic',
      uploaded.url,
    );
    return uploaded;
  }
  @Post('courseImage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadThumbnailImage(@UploadedFile() file: Express.Multer.File) {
    const uploaded = await this._cloudinaryService.uploadFile(file);
    return uploaded;
  }

  @Post('upload_thumbnail')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideoThumbnail(@UploadedFile() file: Express.Multer.File) {
    return await this._cloudinaryService.uploadFile(file);
  }

  @Post('upload_video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCourse(@UploadedFile() file: Express.Multer.File) {
    const uploaded = await this._cloudinaryService.uploadVideo(file);
    return uploaded;
  }
}
