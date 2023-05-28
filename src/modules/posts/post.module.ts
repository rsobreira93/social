import { MulterConfigService } from '@config/multer-config-service';
import { UserModule } from '@modules/users/user.module';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DataBaseModule } from '@shared/database/database.module';
import { LoggerModule } from '@shared/loggers/logger.module';
import { S3Service } from '@shared/s3/s3.service';
import { AwsConfigModule } from '@shared/s3/uploaderS3.module';
import { PostsController } from './infra/http/controllers/posts-controller';
import {
  CreatePost,
  DeletePost,
  ListPosts,
  ListPostsByUser,
  UpdatePost,
} from './use-cases';
import { ShowPost } from './use-cases/show-post';

@Module({
  imports: [
    DataBaseModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    AwsConfigModule,
    LoggerModule,
    UserModule,
  ],
  controllers: [PostsController],
  providers: [
    CreatePost,
    S3Service,
    ListPosts,
    ListPostsByUser,
    UpdatePost,
    ShowPost,
    DeletePost,
  ],
})
export class PostModule {}
