import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Twilio from 'twilio/lib/rest/Twilio';

@Injectable()
export default class TwilioClient {
  private twilio: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.twilio = new Twilio(accountSid, authToken);
  }

  // async confirmPhoneNumber(userId: number, phoneNumber: string, verificationCode: string) {
  //   const serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');

  //   const result = await this.twilioClient.verify.v2.services(serviceSid)
  //     .verificationChecks
  //     .create({to: phoneNumber, code: verificationCode})

  //   if (!result.valid || result.status !== 'approved') {
  //     throw new BadRequestException('Wrong code provided');
  //   }

  //   await this.userRepositoryTyperom.markPhoneNumberAsConfirmed(userId)
  // }

  // initiatePhoneNumberVerification(phoneNumber: string) {
  //   const servceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');

  //   return this.twilioClient.verify.v2
  //     .services(servceSid)
  //     .verifications.create({ to: phoneNumber, channel: 'sms' });
  // }

  async sendMessage(receiverPhoneNumber: string) {
    const senderPhoneNumber = this.configService.get(
      'TWILIO_SENDER_PHONE_NUMBER',
    );

    return this.twilio.messages.create({
      body: 'Votre compte a bien été crée',
      from: senderPhoneNumber,
      to: receiverPhoneNumber,
    });
  }
}
