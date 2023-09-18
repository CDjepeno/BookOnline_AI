export interface ClientSmsPort {
  sendMessage(receiverPhoneNumber: string): void;
}
