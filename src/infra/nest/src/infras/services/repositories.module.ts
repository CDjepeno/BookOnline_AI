import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepositoryTyperom } from './user.repository.typeorm';

import { TwilioClient } from '../clients/twilio/twilio.client';
import { TwilioModules } from '../clients/twilio/twilio.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TwilioModules, ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryTyperom, TwilioClient],
  exports: [UserRepositoryTyperom],
})
export class RepositoriesModule {}
