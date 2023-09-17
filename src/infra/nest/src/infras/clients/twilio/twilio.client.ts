import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Twilio from 'twilio/lib/rest/Twilio';

@Injectable()
export class TwilioClient {
  private twilioClient: Twilio;
  accountSid = process.env.TWILIO_ACCOUNT_SID;
  authToken = process.env.TWILIO_AUTH_TOKEN;
  constructor() {
    this.twilioClient = new Twilio(this.accountSid, this.authToken);
  }

  async sendMessage(receiverPhoneNumber: string, message: string) {
    const senderPhoneNumber = process.env.TWILIO_SENDER_PHONE_NUMBER
    return this.twilioClient.messages.create({
      body: message,
      from: senderPhoneNumber,
      to: receiverPhoneNumber,
    });
  }
}
