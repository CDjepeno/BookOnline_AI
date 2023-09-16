import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepositoryTyperom } from './user.repository.typeorm';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';
import TwilioClient from '../clients/twilio/twilio.client';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TwilioClient, ConfigService],
  providers: [UserRepositoryTyperom],
  exports: [UserRepositoryTyperom],
})
export class RepositoriesModule {}
