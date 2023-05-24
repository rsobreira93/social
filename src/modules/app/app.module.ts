import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/shared/loggers/logger.module';
import { AwsConfigModule } from 'src/shared/s3/uploaderS3.module';
import { UserModule } from '../users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, LoggerModule, AwsConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
