import { MulterConfigService } from '@config/multer-config-service';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DataBaseModule } from '@shared/database/database.module';
import { LoggerModule } from '@shared/loggers/logger.module';
import { S3Service } from '@shared/s3/s3.service';
import { AwsConfigModule } from '@shared/s3/uploaderS3.module';
import { UsersController } from './infra/http/controllers/users-controller';
import {
  CreateUser,
  DeleteUser,
  ListUsers,
  ShowUser,
  UpdateUser,
  UpdateUserAvatar,
  UpdateUserPassword,
} from './use-cases';

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
  providers: [
    CreateUser,
    S3Service,
    ListUsers,
    DeleteUser,
    ShowUser,
    UpdateUser,
    UpdateUserPassword,
    UpdateUserAvatar,
  ],
})
export class UserModule {}
