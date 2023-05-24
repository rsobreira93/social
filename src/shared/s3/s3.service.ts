import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import { AppError } from '../errors/app-errors';
import { AwsConfigService } from './aws-config.service';

@Injectable()
export class S3Service {
  private readonly bucketName = process.env.AWS_BUCKET;

  constructor(private readonly awsConfigService: AwsConfigService) {}

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    if (!file) {
      throw new AppError('No file provided', 'NO_FILE_PROVIDED', 400);
    }

    const s3 = this.awsConfigService.getS3Instance();
    const fileKey = `${folder}/${randomUUID()}-${file.originalname}`;
    const fileBuffer = readFileSync(file.path);

    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: fileBuffer,
      ACL: 'public-read', // Define as per your requirements
    };

    const upload = await s3.upload(params).promise();

    return upload.Location;
  }
}
