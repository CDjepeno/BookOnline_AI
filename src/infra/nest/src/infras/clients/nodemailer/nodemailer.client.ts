import {
  ClientMailPort,
  Imessage,
} from 'src/domaine/repositories/client.mail.port';
import * as nodemailer from 'nodemailer';

export default class NodemailerClient implements ClientMailPort {
  constructor(
    private readonly transporter: nodemailer.Transporter = nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_USERPASSWORD,
        },
      },
    ),
  ) {}

  async sendMail(message: Imessage): Promise<void> {
    try {
      await this.transporter.sendMail({
        to: {
          name: message.to.name,
          email: message.to.email,
        },
        from: {
          name: message.from.name,
          email: message.from.email,
        },
        subject: message.subject,
        body: message.body,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
