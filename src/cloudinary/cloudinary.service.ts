import { Injectable } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');
@Injectable()
export class CloudinaryService {
  

    uploadFile(file: Express.Multer.File,userId:string): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            (error, result) => {
                console.log(result,'result');

                
              if (error) return reject(error);
              resolve(result);
            },
          );
    
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      }
    



    



      




}

