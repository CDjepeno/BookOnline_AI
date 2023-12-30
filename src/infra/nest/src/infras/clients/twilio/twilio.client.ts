import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientSmsPort } from '../../../domaine/repositories/client.sms.port';
import Twilio from 'twilio/lib/rest/Twilio';
import * as dotenv from 'dotenv';
import { EnvironmentEnums } from 'src/enums/environment.enums';
import { InvalidPhoneNumberException } from 'src/domaine/errors/book.error';
dotenv.config();
@Injectable()
export class TwilioClient implements ClientSmsPort {
  private twilioClient: Twilio;

  constructor(private configService: ConfigService) {
    const accountSid = configService.get(EnvironmentEnums.TWILIO_ACCOUNT_SID);
    const authToken = configService.get(EnvironmentEnums.TWILIO_AUTH_TOKEN);
    if (!accountSid || !authToken) {
      throw new Error('Twilio account SID/auth token not found');
    }
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendMessage(receiverPhoneNumber: string) {
    const regexPhone = /^((\+)33)[6-7](\d{2}){4}$/;
    if (!regexPhone.test(receiverPhoneNumber)) {
      throw new InvalidPhoneNumberException("Numero n'est pas valide");
    }

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
