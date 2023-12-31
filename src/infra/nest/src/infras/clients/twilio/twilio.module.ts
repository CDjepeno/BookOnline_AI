import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwilioClient } from './twilio.client';

@Module({
  imports: [ConfigModule],
  providers: [TwilioClient],
  exports: [TwilioClient],
})
export class TwilioModules {}
