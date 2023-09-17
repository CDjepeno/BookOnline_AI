import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Twilio from 'twilio/lib/rest/Twilio';

@Injectable()
export class TwilioClient {
  private twilioClient: Twilio;

  constructor(private configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendMessage(receiverPhoneNumber: string) {
    const senderPhoneNumber = this.configService.get(
      'TWILIO_SENDER_PHONE_NUMBER',
    );
    return this.twilioClient.messages.create({
      body: 'Votre compte a bien été crée',
      from: senderPhoneNumber,
      to: receiverPhoneNumber,
    });
  }
}
