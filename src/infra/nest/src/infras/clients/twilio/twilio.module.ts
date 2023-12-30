import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwilioClient } from './twilio.client';

@Module({
  imports: [ConfigModule],
  providers: [TwilioClient],
  exports: [TwilioClient],

  // imports: [
  //   TwilioModule.forRootAsync({
  //     imports: [ConfigModule],
  //     useFactory: (cfg: ConfigService) => ({
  //       accountSid: cfg.get('TWILIO_ACCOUNT_SID'),
  //       authToken: cfg.get('TWILIO_AUTH_TOKEN'),
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  // providers: [TwilioClient],
  // exports: [TwilioClient],
})
export class TwilioModules {}
