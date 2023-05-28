import { PostModule } from '@modules/posts/post.module';
import { Module } from '@nestjs/common';
import { LoggerModule } from '@shared/loggers/logger.module';
import { AwsConfigModule } from '@shared/s3/uploaderS3.module';
import { UserModule } from '../users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, PostModule, LoggerModule, AwsConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
