import { ClientSmsPort } from 'src/domaine/repositories/client.sms.port';

export class MockClientProvider implements ClientSmsPort {
  sendMessage(): void {}
}
