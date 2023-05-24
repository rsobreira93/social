import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/config/multer-config-service';
import { DataBaseModule } from 'src/shared/database/database.module';
import { LoggerModule } from 'src/shared/loggers/logger.module';
import { S3Service } from 'src/shared/s3/s3.service';
import { AwsConfigModule } from 'src/shared/s3/uploaderS3.module';
import { UsersController } from './infra/http/controllers/users-controller';
import { CreateUser } from './use-cases/create-user';

@Module({
  imports: [
    DataBaseModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    AwsConfigModule,
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [CreateUser, S3Service],
})
export class UserModule {}
