import { Module } from '@nestjs/common';
import { TwilioClient } from './twilio.client';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [TwilioClient],
  exports: [TwilioClient],
})
export class TwilioModules {}